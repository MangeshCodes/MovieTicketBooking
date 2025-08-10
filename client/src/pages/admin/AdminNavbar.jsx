import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { LogOut } from 'lucide-react'

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-3 bg-[#212121] text-white h-16 border-b border-gray-700">
      <Link to="/" className="flex items-center">
        <img src={assets.logo} alt="logo" className='h-auto w-36'/>
        <span className="font-bold ml-2">Admin</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar
