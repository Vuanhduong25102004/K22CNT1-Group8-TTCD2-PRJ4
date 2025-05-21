import Login from './pages/Login';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HeaderComponents from './components/HeaderComponents';
import FooterComponents from './components/FooterComponents';

function App() {
  return (
    <>
      <HeaderComponents />
      <div className="app-content-wrapper" style={{ margin: '0 46px' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
      <FooterComponents />
    </>
  )
}

export default App
