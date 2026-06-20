import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Layout = () => {
    const { checkIsAdmin } = useContext(AppContext);
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verifyAdmin = async () => {
            const ok = await checkIsAdmin();
            if (!ok) {
                toast.error("Access Denied: Admins only");
                navigate('/');
            } else {
                setIsVerified(true);
            }
        };
        verifyAdmin();
    }, []);

    if (!isVerified) {
        return (
            <div className="bg-[#111111] min-h-screen flex items-center justify-center text-white text-lg">
                Verifying Admin Authorization...
            </div>
        );
    }

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
