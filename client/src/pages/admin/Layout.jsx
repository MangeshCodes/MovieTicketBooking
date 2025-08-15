import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

const Layout = () => {
    return (
       <div className="bg-[#111111] min-h-screen">
         <AdminNavbar/>
         <div className="flex">
          <AdminSidebar/>
          <div className="flex-1 px-4 py-6 md:px-6 h-[calc(100vh-64px)] overflow-y-auto bg-[#111111] text-white">
              <Outlet/>
          </div>
         </div>
       </div>
    )
}

export default Layout;
