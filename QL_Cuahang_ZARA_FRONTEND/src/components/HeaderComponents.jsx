import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Header.scss';
import MenuIcon from '../assets/svg/svgexport-1.svg';
import Logo1 from '../assets/svg/logo1.svg';
import Logo2 from '../assets/svg/logo2.svg';

const logos = [Logo1, Logo2];

export default function HeaderComponents() {
    const location = useLocation();
    // Ẩn nút LOG IN khi đang ở trang /logon
    const [logoIndex, setLogoIndex] = useState(0)
    const [isFading, setIsFading] = useState(false);

    const hideLogin = location.pathname === '/logon';
    const breakpoint = 750;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };
        window.addEventListener("resize", handleResize);
        // Gọi luôn để cập nhật trạng thái ngay khi mount
        handleResize();


        const interval = setInterval(() => {
            setIsFading(true); // Bắt đầu hiệu ứng ẩn logo
            setTimeout(() => {
                setLogoIndex(prev => (prev + 1) % logos.length); // đổi logo
                setIsFading(false); // hiện logo mới
            }, 300); // thời gian trùng với CSS transition-duration
        }, 6000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, []);

    //Để đặt đăng nhập thành hoten người đã đăng nhập
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const hoTen = decoded.hoTen; // Lấy claim hoTen từ token
                setUserName(hoTen);
            } catch (e) {
                setUserName(null);
            }
        }
    }, []);

    return (
        <div>
            <header>
                <button className='header-icon'>
                    <img
                        src={MenuIcon}
                        alt="Menu Icon"
                        style={{ width: isMobile ? 40 : 80, height: isMobile ? 40 : 80 }}
                    />
                </button>
                <div className='logo'>
                    <Link to="/">
                        <img
                            src={logos[logoIndex]}
                            alt="Logo"
                            className={isFading ? 'fade' : ''}
                            style={{ cursor: 'pointer' }} // thêm con trỏ chuột khi hover
                        />
                    </Link>
                </div>
                <ul className='ul-search-login-help-shoppingbag'>
                    {isMobile ? (
                        <>
                            {!hideLogin && (
                                <li className='li-login'>
                                    <Link to='/logon'>ĐĂNG NHẬP</Link>
                                </li>
                            )}
                            <li className='li-search'>
                                <a href='#'><IoSearchOutline size={22} /></a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='li-search'>
                                <a href='#'><span className='span-search'>TÌM KIẾM</span></a>
                            </li>
                            {!userName && !hideLogin && (
                                <li className='li-login'>
                                    <Link to='/logon'>ĐĂNG NHẬP</Link>
                                </li>
                            )}
                            {userName && (
                                <li className='li-login'>
                                    <span>Xin chào, {userName}</span>
                                </li>
                            )}
                        </>
                    )}
                    {!isMobile && (
                        <li className='li-help'>
                            <a href='#'>TRỢ GIÚP</a>
                        </li>
                    )}
                    <li className='li-shoppingbag'>
                        {isMobile ? <HiOutlineShoppingBag size={22} /> : <a href="">GIỎ</a>}
                    </li>
                </ul>
            </header>
        </div>
    );
}
