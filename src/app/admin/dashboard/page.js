// src/app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { getCookie } from '@/lib/cookies';
// import { verifyToken } from '@/lib/auth';
// import { jwtDecode } from "jwt-decode";


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {

    // const token = localStorage.getItem('token');
    // if (!token) {
    //   router.push('/admin/login');
    // } else {
    //   const decodedToken = jwtDecode(token);
    //   const currentTime = Date.now() / 1000; // Get current time in seconds
    //   console.log(decodedToken.exp, " v/s " ,currentTime);
    //   if (decodedToken.exp < currentTime) { // Check if token is expired
    //     router.push('/admin/login'); // Redirect to login if token is expired
    //   } else {
    //     setLoading(false); // Set loading to false if token is valid
    //   }
    // }

    //---------------------------------------------------------------------------------

    // const token = getCookie('token');


    // if (!token) {
    //   console.log("No token");
    //   router.push('/admin/login');
    // } else {
    //   try {
    //     console.log("\n\nVerifying token....\n");
    //     verifyToken(token);
    //     setLoading(false);
    //     console.log("\n\nVerified.... Should redirect to Admin dash now!\n");
    //   } catch {
    //     console.log("Failed");
    //     router.push('/admin/login');
    //   }
    // }

    //---------------------------------------------------------------------------------


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


  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
}
