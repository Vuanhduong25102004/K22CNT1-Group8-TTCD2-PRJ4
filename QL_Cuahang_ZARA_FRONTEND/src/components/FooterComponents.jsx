import React from 'react'
import '../styles/Footer.scss';

export default function FooterComponents() {
    return (
        <footer>
            <div className='footerinfo1'>
                <a href='#'>JOIN OUR NEWSLETTER</a>
            </div>
            <div className='footerinfo2'>
                <ul>
                    <li><a href="#">TIK TOK</a></li>
                    <li><a href="#">INSTAGRAM</a></li>
                    <li><a href="#">FACEBOOK</a></li>
                    <li><a href="#">X</a></li>
                    <li><a href="#">PINTEREST</a></li>
                    <li><a href="#">YOUTUBE</a></li>
                    <li><a href="#">SPOTIFY</a></li>
                </ul>
            </div>
            <div className='footerinfo3'>
                <ul>
                    <li><a href="#">COOKIE SETTINGS</a></li>
                    <li><a href="#">PRIVACY AND COOKIES POLICY</a></li>
                    <li><a href="#">TERMS OF USE</a></li>
                </ul>
            </div>
        </footer>
    )
}
