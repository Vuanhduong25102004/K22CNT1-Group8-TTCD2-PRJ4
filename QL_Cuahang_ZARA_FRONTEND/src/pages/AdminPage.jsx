import React from 'react'
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../components/AdminSidebar.jsx'
import AdminHeader from '../components/AdminHeader.jsx'
import '../styles/AdminPage.scss'

export default function AdminPage() {
    return (
        <div>
            <div className='sidebar border-r border-r-gray-300'>
                <aside>
                    <AdminSidebar />
                </aside>
            </div>
            <div className='header-main'>
                <div className='border-b border-gray-300'>
                    <AdminHeader />
                </div>
                <main className="flex-1 overflow-auto p-4">
                    <Outlet />  {/* Đây sẽ hiển thị component con theo route */}
                </main>
            </div>
        </div >
    )
}
