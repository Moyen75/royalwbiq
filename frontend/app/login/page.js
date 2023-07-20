"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Google from '@/components/Google'
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"

function login() {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result.error) {
            console.log(result.error);
            console.error('Authentication failed');
            // Handle authentication error, show an error message, etc.
        } else {
            // Redirect to the desired page after successful login
            console.log(result)
        }
    };
    return (
        <>
            {
                !loading && <div>
                    <Header />

                    <section className="login-section form-section flex justify-center items-center secondary-bg section-y-space">
                        <div className="container">
                            <div className="form-wrapper mx-auto primary-bg">
                                <h2 className="section-title p-font-700 size-2xl primary-color text-capitalize mb-4">Login</h2>
                                <form className="user-form-wrap">
                                    <div className="user-form">
                                        <input onClick={(e) => setEmail(e.target.value)} type="email" name="" id="" placeholder="Your Email *" className="user-input w-full" />
                                    </div>
                                    <div className="user-form">
                                        <input onClick={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder="Your Password *" className="user-input w-full" />
                                    </div>
                                    <div className="user-form-check user-form flex items-center justify-between">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckChecked" value="" />
                                            <label className="form-check-label p-font-500 size-md line-h-md primary-color text-capitalize" htmlFor="flexCheckChecked">Remember Me!</label>
                                        </div>
                                        <div className="text-end">
                                            <button type="button" className="p-font-500 size-md line-h-md primary-color text-underline">Forgot your password?</button></div>
                                    </div>
                                    <div className="user-form">
                                        <button onSubmit={handleSubmit} type="submit" className="user-btn bg-btn w-full">Login</button>
                                    </div>
                                </form>
                                <div className="line text-center my-3"><span className="relative p-font-500 size-md line-h-md primary-color block text-uppercase">or</span></div>
                                <Google />
                                <div className="text-center">
                                    <p className="p-font-500 size-md line-h-md primary-color">Don't have an account?
                                        <a href="/register" className="p-font-500 size-md line-h-md primary-color text-underline">Create an account</a></p>
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

export default login