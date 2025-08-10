import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  }

  // Using an array of menu items for cleaner rendering
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: LayoutDashboardIcon,
      // Dashboard should only be active at exactly /admin
      isActive: (path) => path === '/admin' 
    },
    { 
      name: 'Add Shows', 
      path: '/admin/add-shows', 
      icon: PlusSquareIcon,
      isActive: (path) => path === '/admin/add-shows'
    },
    { 
      name: 'List Shows', 
      path: '/admin/list-shows', 
      icon: ListIcon,
      isActive: (path) => path === '/admin/list-shows'
    },
    { 
      name: 'List Bookings', 
      path: '/admin/list-bookings', 
      icon: ListCollapseIcon,
      isActive: (path) => path === '/admin/list-bookings'
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col w-64 bg-[#212121] text-white">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.imageUrl}
            alt="Admin user"
          />
        </div>
        <p className="mt-2 text-sm font-medium">
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="w-full px-4">
        {menuItems.map((item, index) => {
          const isActive = item.isActive(location.pathname);
          
          return (
            <NavLink
              key={index}
              to={item.path}
              className={`flex items-center gap-3 w-full p-3 my-1 rounded-md transition-all ${
                isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
export default AdminSidebar;
