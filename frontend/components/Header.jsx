"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import '../app/globals.css'
import useAuth from '../utils/useFirebase';
import UserDropdown from './UserDropdown';
function Header() {
    const { user, logOut } = useAuth();
    const [openMenu, setopenMenuMenu] = useState(false)
    console.log(openMenu);

    const naveLink = <>
        <li className="menu-item text-center">
            <a href="/" className="menu-link ">Home</a>
        </li>
        <li className="menu-item text-center mt-2 md:mt-0 lg:mt-0">
            <a href="/" className="menu-link">Products</a>
        </li>
        <li className="menu-item text-center mt-2 md:mt-0 lg:mt-0">
            <a href="/" className="menu-link">About</a>
        </li>
        <li className="menu-item text-center mt-2 md:mt-0 lg:mt-0">
            <a href="/" className="menu-link">Blog</a>
        </li>
        <li className="menu-item text-center mt-2 md:mt-0 lg:mt-0">
            <a href="/" className="menu-link">Contact</a>
        </li>
        {!user && <li className="menu-item text-center mt-2 md:mt-0 lg:mt-0">
            <a href="/login" className="menu-link">Login/Register</a>
        </li>
        }
        {
            user &&
            <li className="menu-item relative flex items-center justify-center mt-4 md:mt-0 lg:mt-0">
                <div className='menu-item relative'>
                    <UserDropdown user={user} logOut={logOut} />
                </div>
            </li>
        }
        <li className="menu-item mt-6 md:mt-0 lg:mt-0 flex items-center justify-center">
            <a href="/" className="menu-link-icon flex items-center relative w-6" title="Wishlist ">
                <Image width={25} height={20} src="/images/icons/suit-heart.svg" alt="Suit Heart" />
                <span className="badge-box s-font-500 text-color3 flex items-center justify-center bg-color3 w-5 h-5">6</span>
            </a>
        </li>
        <li className="menu-item mt-6 md:mt-0 lg:mt-0 flex items-center justify-center">
            <a href="#" className="menu-link-icon flex items-center relative w-6" title="Cart">
                <Image width={20} height={20} src="/images/icons/bag-dash.svg" alt="Bag Dash" />
                <span className="badge-box s-font-500 text-color3 flex items-center justify-center bg-color3 w-5 h-5">9</span>
            </a>
        </li>

    </>

    return (

        <header className="header-area priwrappermary-bg container mx-auto ">
            <div className={`block md:hidden lg:hidden`}>
                <div className={`h-[345px] w-full absolute left-0   ${openMenu ? 'top-[4rem]' : '-top-[350px]'} bg-[#111827]  z-30 p-3 `}>
                    <ul className=''>
                    {naveLink}
                </ul>
                </div>
            </div>
            <div className="wrapper">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="md:columns-3">
                            <a href="#" className="header-logo">
                                <Image width={100} height={20} src="/images/header/logo.png" alt="Site Logo" className="header-logo-Image" />
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <nav className="menu">
                                <ul className="flex items-center justify-end">
                                    {naveLink}
                                </ul>
                            </nav>
                        </div>
                        {/* mini device */}
                        <div className={`block md:hidden lg:hidden`}>
                            <svg onClick={() => setopenMenuMenu(!openMenu)} class="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 14">
                                <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header