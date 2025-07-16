// components/MyInfo.jsx
import React, { useEffect, useState } from 'react';
import { getMyInfo, updateUser } from '../services/UserService';

export default function MyInfo() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        hoTen: '',
        email: '',
        matKhau: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getMyInfo();
                setUser(data);
                setForm({
                    hoTen: data.hoTen,
                    email: data.email,
                    matKhau: ''
                });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...form };
        if (!payload.matKhau) {
            delete payload.matKhau;
        }

        try {
            const updated = await updateUser(user.maNguoiDung, payload);
            setUser(updated);
            setEditMode(false);
            alert('Cập nhật thành công!');
        } catch (err) {
            console.error(err);
            alert('Cập nhật thất bại!');
        }
    };


    if (!user) return <p>Đang tải thông tin...</p>;

    return (
        <div className="profile-right">
            <h2>{editMode ? 'Chỉnh sửa hồ sơ' : user.hoTen}</h2>

            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div className="info-item">
                        <label>Họ tên</label>
                        <input
                            type="text"
                            name="hoTen"
                            value={form.hoTen}
                            onChange={handleChange}
                            placeholder=" "
                        />
                    </div>

                    <div className="info-item">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder=" "
                        />
                    </div>

                    <div className="info-item">
                        <label>Mật khẩu mới (nếu muốn)</label>
                        <input
                            type="password"
                            name="matKhau"
                            value={form.matKhau}
                            onChange={handleChange}
                            placeholder=" "
                        />
                    </div>

                    <button type="submit" className="profile-button-save">Lưu thay đổi</button>
                    <button type="button" onClick={() => setEditMode(false)} className="profile-button-cancel">Hủy</button>
                </form>
            ) : (
                <>
                    <div className="info-item">
                        <label>EMAIL</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="info-item">
                        <label>MẬT KHẨU</label>
                        <p>**********</p>
                    </div>
                    <button onClick={() => setEditMode(true)} className="profile-button">
                        Chỉnh sửa thông tin
                    </button>
                </>
            )}
        </div>
    );
}
