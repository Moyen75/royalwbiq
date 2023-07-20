"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

function page() {

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkLoggedIn = async () => {
            const session = await getSession();
            if (session) {
                // Redirect to the main page if the user is already logged in
                router.push('/');
            } else {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, [router]);
    return (
        <>
            {
                !loading && <div>
                    <Header />
                    <section className="register-section form-section flex justify-center items-center secondary-bg section-y-space">
                        <div className="container">
                            <div className="form-wrapper mx-auto primary-bg">
                                <h2 className="section-title p-font-700 size-2xl primary-color text-capitalize mb-4">Register</h2>
                                <form action="#" className="user-form-wrap">
                                    <div className="user-form">
                                        <input type="text" name="" id="" placeholder="Your Name *" className="user-input w-full" />
                                    </div>
                                    <div className="user-form">
                                        <input type="email" name="" id="" placeholder="Your Email *" className="user-input w-full" />
                                    </div>
                                    <div className="user-form">
                                        <input type="password" name="" id="" placeholder="Your Password *" className="user-input w-full" />
                                    </div>
                                    <div className="user-form">
                                        <button type="submit" className="user-btn bg-btn w-full">Register</button>
                                    </div>
                                </form>
                                <div className="line text-center my-3"><span className="relative p-font-500 size-md line-h-md primary-color block uppercase">or</span></div>
                                <button className="user-google w-full flex items-center justify-center secondary-bg mb-3">
                                    <Image width={25} height={25} src="/images/icons/google.png" alt="google" className="me-2" />
                                    <p className="p-font-500 size-sm line-h-sm primary-color text-capitalize">Continue With Google</p>
                                </button>
                                <div className="text-center">
                                    <p className="p-font-500 size-md line-h-md primary-color">Already have an account?
                                        <a href="/login" className="p-font-500 size-md line-h-md primary-color text-underline">Login</a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            }
        </>
    )
}

export default page