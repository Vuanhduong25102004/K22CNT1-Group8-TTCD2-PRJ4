import React from 'react'
import { VscMenu } from "react-icons/vsc";
import '../styles/Header.scss';


export default function HeaderComponents() {
    return (
        <>
            <header>
                <button className='header-icon'>
                    <VscMenu size={80} />
                </button>
                <div className='logo'>
                    <img src="https://static.zara.net/static/images/logo.png" alt="ZARA Logo" style={{ height: 40 }} />
                </div>
                <ul className='ul-search-login-help-shoppingbag'>
                    <li className='li-search'>
                        <a href='#'><span className='span-search'>SEARCH</span></a>
                    </li>
                    <li className='li-login'>
                        <a href='#'>LOG IN</a>
                    </li>
                    <li className='li-help'>
                        <a href='#'>HELP</a>
                    </li>
                    <li className='li-shoppingbag'>
                        <a href="">SHOPPING BAG</a>
                    </li>
                </ul>
            </header>
        </>
    )
}