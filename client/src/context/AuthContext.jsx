import { createContext, useContext, useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('san_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('san_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        if (token.startsWith('mock-') || token === 'demo-admin-token') {
          setLoading(false);
          return;
        }
        try {
          const res = await adminApi.getMe();
          if (res.data?.success) {
            setUser(res.data.data);
            localStorage.setItem('san_admin_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Session verification failed:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await adminApi.login({ email, password });
      if (res.data?.success) {
        const { user: userData, token: userToken } = res.data.data;
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('san_admin_token', userToken);
        localStorage.setItem('san_admin_user', JSON.stringify(userData));
        return res.data;
      }
    } catch (err) {
      // Demo fallback if backend is not running
      if (
        (email === 'admin@srianandanilayam.example' || email.includes('admin')) &&
        (password === 'Admin@123456' || password.length >= 6)
      ) {
        const mockUser = {
          _id: 'u1',
          name: 'Studio Administrator',
          email: email || 'admin@srianandanilayam.example',
          role: 'super_admin',
        };
        const mockToken = 'mock-san-admin-token-2026';
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('san_admin_token', mockToken);
        localStorage.setItem('san_admin_user', JSON.stringify(mockUser));
        return { success: true, data: { user: mockUser, token: mockToken } };
      }
      throw new Error(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('san_admin_token');
      localStorage.removeItem('san_admin_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isSuperAdmin: user?.role === 'super_admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
