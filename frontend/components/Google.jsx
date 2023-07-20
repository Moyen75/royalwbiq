"use client"
import React from 'react'
import { signIn } from 'next-auth/react';
import Image from 'next/image'

function Google() {
    return (
        <button onClick={() => signIn('google')} className="user-google w-full flex items-center justify-center secondary-bg mb-3">
            <Image width={100} height={20} src="/images/icons/google.png" alt="google" className="me-2" />
            <p className="p-font-500 size-sm line-h-sm primary-color text-capitalize">Continue With Google</p>
        </button>
    )
}

export default Google