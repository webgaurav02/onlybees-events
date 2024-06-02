// src/app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


// Components
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loading from '@/app/components/Loading';


export default function DashboardPage({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {

    //To verify admin jwt token using cookies
    const verifyUser = async () => {
      try {
        const res = await fetch('/api/admin/auth/verify', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setLoading(false);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Failed to verify token', error);
        router.push('/admin/login');
      }
    };

    verifyUser();


    //For the dashboard template script
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };


  }, [router]);

  if (loading) {
    return <Loading />
  }






  return (
    <div className="dark">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#111111] text-white">
            <Header />
            <Sidebar />
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                {children}
            </div>
        </div>
    </div>
)
}
