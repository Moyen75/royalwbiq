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
                        <div className="flex-none">
                            <a href="#" className="header-logo">
                                <Image width={100} height={20} src="/images/header/logo.png" alt="Site Logo" className="header-logo-Image" />
                            </a>
                        </div>
                        <div className="flex-auto w-100">
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
                                </ul>
                            </nav>
                        </div>
                        <div className='flex-auto  menu'>
                            <ul className="flex items-center justify-end">
                                <li className="menu-item">
                                    <form class="flex items-center">
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative w-full">
                                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 " placeholder="Search in our store" required />
                                        </div>
                                        <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-gray-600 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                            <span class="sr-only">Search</span>
                                        </button>
                                    </form>
                                </li>
                                {!user && <li className="menu-item">
                                    <a href="/login" className="menu-link"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                                        <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                    </svg></a>
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
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header