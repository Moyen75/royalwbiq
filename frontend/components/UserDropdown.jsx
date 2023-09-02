"use client";
import React, { useEffect, useRef, useState } from 'react'

function UserDropdown({ user, logOut }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [image, setImage] = useState("/user.jpg");

    const toggleDropdown = () => {
        if (user) setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {
        setImage(user?.photoURL ? user.photoURL : "/user.jpg");
    }, [user]);
    // Close the dropdown when a click occurs outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className='relative w-10' ref={dropdownRef}>
            <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="relative menu-item w-10 h-10 rounded-full cursor-pointer" src={image} alt="user" onClick={toggleDropdown} />

            {isDropdownOpen && <div id="userDropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-red-900 dark:text-white">
                    <div>{capitalizeFirstLetter(user.displayName)}</div>
                    <div className="font-medium truncate">{user.email} </div>
                </div>
                <ul className="py-2 text-sm text-red-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black user-account">Account</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black user-account">Orders</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black user-account">Wishlist</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black user-account">Cart</a>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logOut}>Sign out</a>
                </div>
            </div>}
        </div>
    )
}

export default UserDropdown
