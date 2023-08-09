"use client"
import React from 'react'
import Image from 'next/image'
import useAuth from '../utils/useFirebase';
import Swal from 'sweetalert2';

function Google({ router, modal }) {
    const { googleSignIn } = useAuth();
    return (
        <button onClick={() => googleSignIn(router, modal)} className="user-google w-full flex items-center justify-center secondary-bg mb-3">
            <Image width={100} height={20} src="/images/icons/google.png" alt="google" className="me-2" />
            <p className="p-font-500 size-sm line-h-sm secondary-color text-capitalize">Continue With Google</p>
        </button>
    )
}

export default Google