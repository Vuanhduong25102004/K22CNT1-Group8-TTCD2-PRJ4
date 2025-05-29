import React from 'react'
import '../styles/Footer.scss';

export default function FooterComponents() {
    return (
        <footer>
            <div className='footerservice'>
                <div className='footerinfo1'>
                    <a href='#'>THAM GIA BẢNG TIN CỦA CHÚNG TÔI</a>
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
                        <li><a href="#">CÀI ĐẶT COOKIE</a></li>
                        <li><a href="#">CHÍNH SÁCH VẾ QUYỀN RIÊNG TƯ VÀ COOKIE</a></li>
                        <li><a href="#">ĐIỀU KHOẢN SỬ DỤNG</a></li>
                    </ul>
                </div>
            </div>
            <div className='footerinfo'>
                <p>CÔNG TY TNHH MITRA ADIPERKASA VIỆT NAM</p>
                <ul>
                    <li>Giấy chứng nhận đăng ký kinh doanh số: 0312886947 | Ngày cấp: Ngày 8 tháng 7 năm 2014 | Lần sửa đổi gần nhất: Ngày 18 tháng 1 năm 2024</li>
                    <li>Phòng đăng ký kinh doanh: Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh</li>
                    <li>Địa chỉ đã đăng ký: Tầng 4A, Tòa Nhà Vincom Center, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</li>
                    <li>Liên hệ với chúng tôi: <a href='#'>info-vn@zara.com</a></li>
                </ul>
            </div>
        </footer>
    )
}
