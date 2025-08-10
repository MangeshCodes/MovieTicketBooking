import React, { useState } from "react";
import { assets } from '../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Search as SearchIcon, TicketPlus, X as XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {user}=useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();

    return (
        <nav className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-primary shadow'>
            <Link to="/" className="flex items-center">
                <img src={assets.logo} alt="Logo" className='w-36 h-auto' />
            </Link>
            <div className="hidden md:flex items-center gap-8 font-medium text-lg text-white">
                <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/' className="hover:text-primary-dull">Home</Link>
                <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/movies' className="hover:text-primary-dull">Movies</Link>
                <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/theaters' className="hover:text-primary-dull">Theaters</Link>
                <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/releases' className="hover:text-primary-dull">Releases</Link>
                <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/favourite' className="hover:text-primary-dull">Favourite</Link>
            </div>
            <div className='flex items-center gap-6'>
                
                <SearchIcon className="hidden md:block w-6 h-6 cursor-pointer text-white" />
                {!user ? (
                    <button onClick={openSignIn} className="px-4 py-1 bg-red-700 text-primary-dull hover:bg-primary-dull hover:text-white transition rounded-full font-medium cursor-pointer">
                        Login
                    </button>
                ) : (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                            label='My Bookings'
                            labelIcon={<TicketPlus width={15}/>}
                            onClick={()=>navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                )}
                
                <MenuIcon className='md:hidden w-8 h-8 cursor-pointer text-white' onClick={() => setIsOpen(true)} />
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center gap-8 font-medium text-lg text-white md:hidden">
                    <XIcon className="absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/' className="hover:text-primary-dull">Home</Link>
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/movies' className="hover:text-primary-dull">Movies</Link>
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/theaters' className="hover:text-primary-dull">Theaters</Link>
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/releases' className="hover:text-primary-dull">Releases</Link>
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/favourites' className="hover:text-primary-dull">Favourites</Link>
                </div>
            )}
        </nav>
    )
}
export default Navbar;