import React from 'react'
import logo1 from '../assets/svg/logo1.svg';
import { LiaProductHunt } from "react-icons/lia";
import { LuUser } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { TbNotes } from "react-icons/tb";
import { PiShoppingCart, PiNoteBlankDuotone, PiCreditCardLight, PiHandCoinsLight } from "react-icons/pi";

const menuItems = [
    { name: "Sản phẩm", icon: LiaProductHunt, link: "/admin/products" },
    { name: "Người dùng", icon: LuUser, link: "/admin/users" },
    { name: "Giỏ hàng", icon: IoBagCheckOutline, link: "/admin/giohang" },
    { name: "Đơn hàng", icon: TbNotes, link: "/admin/orderDetail" },
    { name: "Thanh toán", icon: PiCreditCardLight, link: "/admin/adminpaymentmanagement" },
    { name: "Phương thức thanh toán", icon: PiHandCoinsLight, link: "/admin/adminpaymentmethodmanagement" },
]

export default function AdminSidebar() {
    return (
        <div>
            <div className='pt-5 pb-4'>
                <Link to="/"><img src={logo1} alt="Logo" /></Link>
            </div>
            <div>
                <h3 className='mb-4 font-semibold text-lg'>
                    Quản lý
                </h3>
                <ul className="space-y-2.5">
                    {menuItems.map(({ name, icon: Icon, link }) => (
                        <li key={name} className="py-2 px-3">
                            <a href={link} className="flex items-center space-x-2 hover:bg-gray-100 rounded py-1">
                                <Icon className="text-gray-600" />
                                <span>{name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
