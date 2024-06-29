"use client"
import React, { useState, useEffect } from 'react'

//Components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '@/app/components/Loading';

// Context
import { useAuth } from '@/context/AuthContext';

//Router
import { useRouter } from 'next/navigation';

const Dashboard = ({ children }) => {

  const { user, login } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  const router = useRouter();

  //To verify user jwt token using cookies
  const verifyUser = async () => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        // const data = await res.json();
        // login(data.user.phone, true);
        setLoggedIn(true);
        setLoading(false);
      }
      else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to verify token', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    verifyUser();
  }, [])

  if (loading) {
    return <Loading />
  }

  if(loggedIn){
    return (
      <div className='bg-black'>
        <Navbar mode="dark" />
        <div className='bg-black min-h-[100svh] text-black'>
          {children}
        </div>
        <Footer mode="dark"></Footer>
      </div>
    )
  }
}

export default Dashboard