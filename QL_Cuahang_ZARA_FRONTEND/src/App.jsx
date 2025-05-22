import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import HeaderComponents from './components/HeaderComponents';
import FooterComponents from './components/FooterComponents';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function Layout() {
  const location = useLocation();

  // Nếu đang ở trang /login thì không render Header
  const hideHeader = location.pathname === '/login';

  return (
    <>
      {!hideHeader && <HeaderComponents />}
      <AppRoutes />
      {!hideHeader && <FooterComponents />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
