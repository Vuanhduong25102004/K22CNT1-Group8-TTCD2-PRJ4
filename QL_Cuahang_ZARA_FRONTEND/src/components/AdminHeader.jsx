import React, { useState, useEffect } from 'react'
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';

export default function AdminHeader() {

    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const hoTen = decoded.hoTen; // Lấy claim hoTen từ token
                setUserName(hoTen);
            } catch (e) {
                setUserName(null);
            }
        }
    }, []);
    return (
        <header className="flex flex-wrap items-center justify-between p-4 sm:p-6 min-h-[64px] ">
            {/* Left side */}
            <div className="flex items-center space-x-4 w-full sm:w-auto mb-2 sm:mb-0">
                <button
                    type="button"
                    className="w-10 h-10 border border-gray-300 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100"
                >
                    <HiOutlineMenuAlt1 size={20} className='text-gray-500' />
                </button>

                <div className="relative border border-gray-300 rounded-sm h-10 flex items-center w-100 ">
                    <CiSearch size={20} className="absolute left-2 text-gray-700 " />
                    <input
                        type="text"
                        className="pl-8 pr-2 h-full rounded-sm w-full focus:outline-none"
                        placeholder="Search or type command..."
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                    type="button"
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
                >
                    <MdOutlineDarkMode size={20} />
                </button>

                <button
                    type="button"
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
                >
                    <MdDarkMode size={20} />
                </button>

                <button
                    type="button"
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
                >
                    <IoIosNotificationsOutline size={20} />
                </button>


                {userName && (
                    <div className="font-medium text-gray-700 whitespace-nowrap">
                        {userName}
                    </div>
                )}
            </div>

        </header>

    )
}
