import React from 'react'
import logo1 from '../assets/svg/logo1.svg';
import { LiaProductHunt } from "react-icons/lia";
import { LuUser } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";
import { PiShoppingCart, PiNoteBlankDuotone, PiCreditCardLight, PiHandCoinsLight } from "react-icons/pi";

const menuItems = [
    { name: "Sản phẩm", icon: LiaProductHunt, link: "/admin/products" },
    { name: "Người dùng", icon: LuUser, link: "#" },
    { name: "Giỏ hàng", icon: IoBagCheckOutline, link: "#" },
    { name: "Chi tiết giỏ hàng", icon: PiShoppingCart, link: "#" },
    { name: "Đơn hàng", icon: PiNoteBlankDuotone, link: "#" },
    { name: "Chi tiết đơn hàng", icon: TbNotes, link: "#" },
    { name: "Thanh toán", icon: PiCreditCardLight, link: "#" },
    { name: "Phương thức thanh toán", icon: PiHandCoinsLight, link: "#" },
]

export default function AdminSidebar() {
    return (
        <div>
            <div className='pt-5 pb-4'>
                <img src={logo1} alt="Logo" />
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
