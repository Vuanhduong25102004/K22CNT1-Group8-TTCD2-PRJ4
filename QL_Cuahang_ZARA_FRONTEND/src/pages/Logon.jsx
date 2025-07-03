import React from 'react';
import { useNavigate } from 'react-router-dom';
import myImage from '../assets/images/image-ipadh-07a07abc-2162-41fe-a0cc-2c59ffe69775-default_0.jpg';
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import '../styles/Logon.scss';

export default function Logon() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');  // chuyển sang route /login
    };

    const handleRegisterClick = () => {
        navigate('/register')
    };

    return (
        <main style={{ paddingTop: '213px' }}>
            <HeaderComponents />
            <div className="logon-page">
                <main className="logon-main">
                    <div className="logon-container">
                        <div className="logon-left">
                            <h2 className="logon-title">
                                ENJOY THE BEST EXPERIENCE
                            </h2>
                            <p className="logon-description">
                                Log in to enjoy a personalised experience and access all our services.
                            </p>
                            <div className="logon-buttons">
                                <button className="btn btn-login" onClick={handleLoginClick}>
                                    LOG IN
                                </button>
                                <button className="btn btn-register" onClick={handleRegisterClick}>
                                    REGISTER
                                </button>
                            </div>
                        </div>
                        <div className="logon-right">
                            <img className="logon-image" src={myImage} alt="" />
                        </div>
                    </div>
                </main>
            </div>
            <FooterComponents />
        </main>
    );
}
