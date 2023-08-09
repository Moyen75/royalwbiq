"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import useAuth from '../../utils/useFirebase'
import Swal from 'sweetalert2';
import Google from '@/components/Google';
function page() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { emailSignUp } = useAuth();
    const modal = () => {
        Swal.fire(
            'Good job!',
            'You signed in successfully!',
            'success'
        )
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = emailSignUp({
            email,
            password,
            name,
            router,
            modal
        });
        console.log(result);
    }

    return (
        <>
            <div>
                <Header />
                <section className="register-section form-section flex justify-center items-center secondary-bg section-y-space">
                    <div className="container">
                        <div className="form-wrapper mx-auto primary-bg">
                            <h2 className="section-title p-font-700 size-2xl secondary-color text-capitalize mb-4">Register</h2>
                            <form onSubmit={handleSubmit} className="user-form-wrap">
                                <div className="user-form">
                                    <input onChange={(e) => setName(e.target.value)} type="text" name="" id="" placeholder="Your Name *" className="user-input w-full" />
                                </div>
                                <div className="user-form">
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="" id="" placeholder="Your Email *" className="user-input w-full" />
                                </div>
                                <div className="user-form">
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder="Your Password *" className="user-input w-full" />
                                </div>
                                <div className="user-form">
                                    <button type="submit" className="user-btn bg-btn w-full">Register</button>
                                </div>
                            </form>
                            <div className="line text-center my-3"><span className="relative p-font-500 size-md line-h-md secondary-color block uppercase">or</span></div>
                            <Google router={router} modal={modal} />
                            <div className="text-center">
                                <p className="p-font-500 size-md line-h-md secondary-color">Already have an account?
                                    <a href="/login" className="p-font-500 size-md line-h-md secondary-color text-underline">Login</a></p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default page