import React, { useState, useEffect } from 'react';
import { VscMenu } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.scss';

export default function HeaderComponents() {
    const location = useLocation();
    // Ẩn nút LOG IN khi đang ở trang /logon
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

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <header>
                <button className='header-icon'>
                    <VscMenu size={isMobile ? 40 : 80} />
                </button>
                <div className='logo'>
                    <img src="https://static.zara.net/static/images/logo.png" alt="ZARA Logo" style={{ height: 40 }} />
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
