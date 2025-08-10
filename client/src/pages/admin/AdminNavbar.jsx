import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div>
      <Link to="/">
      <img src={assets.logo} alt="logo" className='h-auto w-36'/>
      </Link>
    </div>
  )
}

export default AdminNavbar
