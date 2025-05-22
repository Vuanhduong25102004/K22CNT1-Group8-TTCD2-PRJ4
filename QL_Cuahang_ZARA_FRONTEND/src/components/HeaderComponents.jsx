import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation } from 'react-router-dom';
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



    return (
        <>
            <header>
                <button className='header-icon'>
                    <img
                        src={MenuIcon}
                        alt="Menu Icon"
                        style={{ width: isMobile ? 40 : 80, height: isMobile ? 40 : 80 }}
                    />
                </button>
                <div className='logo'>
                    <img
                        src={logos[logoIndex]}
                        alt="Logo"
                        className={isFading ? 'fade' : ''}
                    />
                </div>
                <ul className='ul-search-login-help-shoppingbag'>
                    {isMobile ? (
                        <>
                            {!hideLogin && (
                                <li className='li-login'>
                                    <Link to='/logon'>LOG IN</Link>
                                </li>
                            )}
                            <li className='li-search'>
                                <a href='#'><IoSearchOutline size={22} /></a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='li-search'>
                                <a href='#'><span className='span-search'>SEARCH</span></a>
                            </li>
                            {!hideLogin && (
                                <li className='li-login'>
                                    <Link to='/logon'>LOG IN</Link>
                                </li>
                            )}
                        </>
                    )}
                    {!isMobile && (
                        <li className='li-help'>
                            <a href='#'>HELP</a>
                        </li>
                    )}
                    <li className='li-shoppingbag'>
                        {isMobile ? <HiOutlineShoppingBag size={22} /> : <a href="">SHOPPING BAG</a>}
                    </li>
                </ul>
            </header>
        </>
    );
}
