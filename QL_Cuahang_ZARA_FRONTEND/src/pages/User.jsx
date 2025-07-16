import React from 'react'
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import '../styles/Profile.scss'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/logoutService';

export default function User() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('userChanged'));
                navigate('/');
            })
            .catch(err => {
                console.error('Logout error:', err.response || err);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    window.dispatchEvent(new Event('userChanged'));
                    navigate('/login');
                } else {
                    alert('Đăng xuất không thành công, vui lòng thử lại.');
                }
            });
    };

    return (
        <>
            <HeaderComponents />
            <main style={{ paddingTop: '300px', paddingBottom: '123px' }}>
                <div className="user-container">
                    <div className="user-content">
                        <ul className="user-menu">
                            <Link to="/orders">MUA HÀNG</Link>
                            <li>HOÀN TRẢ</li>
                            <li>THÔNG BÁO</li>
                            <li>PHƯƠNG THỨC THANH TOÁN</li>
                            <Link to="/user/myinfo">HỒ SƠ</Link>
                            <li>CÀI ĐẶT</li>
                        </ul>
                        <ul className="user-support">
                            <li>YÊU THÍCH</li>
                            <li>TRỢ GIÚP</li>
                            <li
                                onClick={handleLogout}
                                style={{ cursor: 'pointer' }}
                            >
                                ĐĂNG XUẤT
                            </li>
                        </ul>
                    </div>
                    <div className="user-right">
                        <Outlet />
                    </div>
                </div>
            </main>
            <FooterComponents />
        </>
    )
}
