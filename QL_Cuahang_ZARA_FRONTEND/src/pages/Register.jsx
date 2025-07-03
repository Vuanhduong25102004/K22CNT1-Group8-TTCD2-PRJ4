import React from 'react'
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import '../styles/Register.scss';

function Register() {
    return (
        <main style={{ paddingTop: '213px' }}>
            <HeaderComponents />
            <div className="register-page">
                <main className="form-register">
                    <div className="register-container">
                        <div className="register-left">
                            <form action="">
                                <h2 style={{ paddingBottom: '50px' }}>THÔNG TIN CÁ NHÂN</h2>
                                <div className='register-form-body'>
                                    <div>
                                        <div className='input-group'>
                                            <input
                                                id='hoten'
                                                name='hoten'
                                                type='text'
                                                required
                                                placeholder=" "
                                            />
                                            <label htmlFor="hoten">HỌ TÊN</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='input-group'>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder=" "
                                            />
                                            <label htmlFor="email">EMAIL</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="input-group">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                placeholder=" "
                                            />
                                            <label htmlFor="password">PASSWORD</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="register-button" >
                                    <button type="submit" className="btn btn-register">
                                        TẠO TÀI KHOẢN
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <FooterComponents />
        </main>
    );
}

export default Register;