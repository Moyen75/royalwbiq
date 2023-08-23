"use client";
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Products from '@/components/Products'
import useAuth from '../utils/useFirebase';
import { useEffect, useState } from 'react';

export default function Home() {
  const { loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    if (!loading) {
      return setShowLoading(false);
    }
  }, [loading]);
  if (showLoading) {
    return <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="px-3 py-1  font-medium leading-none text-center text-black-800 bg-black-200 rounded-full animate-pulse dark:bg-black-900 dark:text-black-200">loading...</div>
    </div>
  }
  return (<>
    {!loading && <div>
      <Header />
      <Banner />
      <Products />
      <Footer />
    </div>}
  </>
  )
}
