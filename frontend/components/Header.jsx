"use client"
import React from 'react';
import Image from 'next/image';
import '../app/globals.css'
import useAuth from '../utils/useFirebase';
import UserDropdown from './UserDropdown';
function Header() {
    const { user, logOut } = useAuth();

    return (

        <header className="header-area priwrappermary-bg container mx-auto">
            <div className="wrapper">
                <div className="container mx-auto">
                    <div className="flex items-center">
                        <div className="md:columns-3">
                            <a href="#" className="header-logo">
                                <Image width={100} height={20} src="/images/header/logo.png" alt="Site Logo" className="header-logo-Image" />
                            </a>
                        </div>
                        <div className="">
                            <nav className="menu">
                                <ul className="flex items-center justify-end">
                                    <li className="menu-item">
                                        <a href="/" className="menu-link">Home</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="/" className="menu-link">Products</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="/" className="menu-link">About</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="/" className="menu-link">Blog</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="/" className="menu-link">Contact</a>
                                    </li>
                                    {!user && <li className="menu-item">
                                        <a href="/login" className="menu-link">Login/Register</a>
                                    </li>
                                    }
                                    {
                                        user &&
                                        <li className="menu-item relative">
                                            <div className='menu-item relative'>
                                                <UserDropdown user={user} logOut={logOut} />
                                            </div>
                                        </li>
                                    }
                                    <li className="menu-item">
                                        <a href="/" className="menu-link-icon flex items-center relative" title="Wishlist">
                                            <Image width={25} height={20} src="/images/icons/suit-heart.svg" alt="Suit Heart" />
                                            <span className="badge-box s-font-500 text-color3 flex items-center justify-center bg-color3 w-5 h-5">6</span>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="menu-link-icon flex items-center relative" title="Cart">
                                            <Image width={20} height={20} src="/images/icons/bag-dash.svg" alt="Bag Dash" />
                                            <span className="badge-box s-font-500 text-color3 flex items-center justify-center bg-color3 w-5 h-5">9</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header