import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import FloatingActions from '../components/common/FloatingActions';

export default function PublicLayout() {
  const { pathname } = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
