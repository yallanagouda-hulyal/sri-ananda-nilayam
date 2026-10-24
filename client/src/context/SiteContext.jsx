import { createContext, useContext, useState, useEffect } from 'react';
import { publicApi } from '../api/publicApi';

const defaultSettings = {
  companyName: 'Sri Ananda Nilayam',
  tagline: 'DESIGN | CONSTRUCTION | INTERIORS',
  phone: '+91 98765 43210',
  phoneRaw: '+919876543210',
  whatsapp: '+91 98765 43210',
  whatsappRaw: '919876543210',
  email: 'info@srianandaniyam.example',
  address: '123 Main Road, Bengaluru, Karnataka 560001',
  workingHours: 'Monday–Saturday, 9:00 AM–6:00 PM',
  footerCredit: 'Designed and developed by bookmywebsite.in',
  footerCreditLink: 'https://bookmywebsite.in',
  logoUrl: '/images/logo.svg',
  logoDarkUrl: '/images/logo-dark.svg',
  faviconUrl: '/images/favicon.svg',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  youtube: 'https://youtube.com',
};

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await publicApi.getSettings();
      if (res.data?.success && res.data.data) {
        setSettings((prev) => ({
          ...prev,
          ...res.data.data,
          // Format raw numbers for click-to-call and WhatsApp
          phoneRaw: (res.data.data.phone || prev.phone).replace(/\s+/g, ''),
          whatsappRaw: (res.data.data.whatsapp || prev.whatsapp).replace(/[^0-9]/g, ''),
        }));
      }
    } catch (err) {
      console.warn('Could not load dynamic settings, using defaults:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
