import React, { useState } from 'react'
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import { useNavigate } from "react-router-dom";
import '../styles/Register.scss';
import { createNguoiDung } from '../services/registerService';

function Register() {
    const [formData, setFormData] = useState({
        hoTen: '',
        email: '',
        matKhau: '',
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createNguoiDung(formData);
            setMessage('Tạo tài khoản thành công');
            navigate("/login");
        } catch (error) {
            setMessage(error);
        }
    }

    return (
        <main style={{ paddingTop: '213px' }}>
            <HeaderComponents />
            <div className="register-page">
                <main className="form-register">
                    <div className="register-container">
                        <div className="register-left">
                            <form onSubmit={handleSubmit}>
                                <h2 style={{ paddingBottom: '50px' }}>THÔNG TIN CÁ NHÂN</h2>
                                <div className='register-form-body'>
                                    <div>
                                        <div className='input-group'>
                                            <input
                                                id='hoTen'
                                                name='hoTen'
                                                type='text'
                                                required
                                                onChange={handleChange}
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
                                                onChange={handleChange}
                                                placeholder=" "
                                            />
                                            <label htmlFor="email">EMAIL</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="input-group">
                                            <input
                                                id="matKhau"
                                                name="matKhau"
                                                type="password"
                                                required
                                                onChange={handleChange}
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