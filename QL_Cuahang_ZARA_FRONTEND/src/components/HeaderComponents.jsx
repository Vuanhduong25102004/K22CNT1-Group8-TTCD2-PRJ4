import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/logoutService';
import { jwtDecode } from 'jwt-decode';
import '../styles/Header.scss';
import MenuIcon from '../assets/svg/svgexport-1.svg';
import Logo1 from '../assets/svg/logo1.svg';
import Logo2 from '../assets/svg/logo2.svg';

const logos = [Logo1, Logo2];

export default function HeaderComponents() {
    const location = useLocation();
    const navigate = useNavigate(); // Thêm khai báo navigate

    const [showLogoutBtn, setShowLogoutBtn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [logoIndex, setLogoIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const breakpoint = 750;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    const hideLogin = location.pathname === '/logon';

    const [isHomePage, setIsHomePage] = useState(false);
    const [isSearchPage, setIsSearchPage] = useState(true);
    const [isProductDetail, setIsProductDetail] = useState(false)

    //cập nhật isProductDetail khi path thay đổi
    useEffect(() => {
        setIsProductDetail(location.pathname.startsWith('/product/'));
    }, [location.pathname])

    //cập nhật isSearchPage khi path thay dổi
    useEffect(() => {
        setIsSearchPage(location.pathname === '/home/search')
    }, [location.pathname])

    // cập nhật isHomePage khi path thay đổi
    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location.pathname]);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setLogoIndex(prev => (prev + 1) % logos.length);
                setIsFading(false);
            }, 300);
        }, 6000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const updateUserName = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const hoTen = decoded.hoTen || decoded.name || decoded.username || null;
                    setUserName(hoTen);
                } catch (e) {
                    setUserName(null);
                }
            } else {
                setUserName(null);
            }
        };

        updateUserName();

        window.addEventListener('userChanged', updateUserName);
        return () => {
            window.removeEventListener('userChanged', updateUserName);
        };
    }, []);

    const handleLogout = () => {
        logout()
            .then(() => {
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('userChanged'));
                setUserName(null);
                setShowLogoutBtn(false);
                navigate('/');
            })
            .catch(err => {
                console.error('Logout error:', err.response || err);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    window.dispatchEvent(new Event('userChanged'));
                    setUserName(null);
                    setShowLogoutBtn(false);
                    navigate('/login');
                } else {
                    alert('Đăng xuất không thành công, vui lòng thử lại.');
                }
            });
    };

    const toggleLogoutBtn = () => {
        setShowLogoutBtn(prev => !prev);
    };

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
                    {!isProductDetail && (<Link to="/">
                        <img
                            src={logos[logoIndex]}
                            alt="Logo"
                            className={isFading ? 'fade' : ''}
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>)}
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
                            {!isSearchPage && (<li className='li-search'>
                                <a href='/home/search'><span className='span-search'>TÌM KIẾM</span></a>
                            </li>)}
                            {!userName && !hideLogin && (
                                <li className='li-login'>
                                    <Link to='/logon'>ĐĂNG NHẬP</Link>
                                </li>
                            )}
                            {userName && (
                                <li className='li-login relative'>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleLogoutBtn}
                                    >
                                        Xin chào, {userName}
                                    </span>

                                    {showLogoutBtn && (
                                        <button
                                            onClick={handleLogout}
                                            className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100"
                                        >
                                            Đăng xuất
                                        </button>
                                    )}
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
                {!isHomePage && (
                    <ul className="ul-category-menu">
                        <li><a href='#'><span>Nam</span></a></li>
                        <li><a href='#'><span>Nữ</span></a></li>
                        <li><a href='#'><span>Trẻ em</span></a></li>
                    </ul>
                )}
            </header>
        </div>
    );
}
