"use client"

import React, { useState } from 'react'

//Components
import VideoComponent from './VideoComponent'
import Loading from './Loading';


//Toaster
import { toast, Toaster } from "react-hot-toast";


const HeroSection = () => {


  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await fetch('/api/clients/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Email submitted successfully!");
      } else {
        toast.error('Error submitting email. Please try again.');
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error submitting email:', error);
      toast.error('Error submitting email. Please try again.');
      setIsLoading(false)
    }
  };


  return (
    <div className='flex md:flex-row flex-col items-center'>
      <Toaster toastOptions={{ duration: 4000 }} />
      <VideoComponent />
      <div className='flex flex-col md:w-[37rem] mx-auto px-10 md:px-0'>
        <h1 className='font-coolvetica md:text-6xl text-3xl mt-10 md:mt-0 leading-none'>WE ARE THE DOERS,</h1>
        <h1 className='font-coolvetica md:text-6xl text-3xl leading-none'>THINKERS, DREAMERS</h1>
        <p className='md:w-[37rem] mt-2 md:text-[1.3rem] text-[1.1rem] md:leading-snug leading-tight text-justify font-coolvetica text-[#8B8A8A] opacity-85'>THIS IS HOW WE PICTURE IT. A SWARM OF BEES BUILDING A HIVE TO SHARE AN ECOSYSTEM. THERE IS SOMETHING INTRIGUING ABOUT THE &quot;DANCE LANGUAGE&quot; OF BEES. AND OUR TEAM IS DEDICATED TO COMMUNICATE AND BUILD A CREATIVE ECOSYSTEM IN THE MOST EFFECTIVE AND IMPACTFUL WAY.</p>
        {isLoading && <Loading />}
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email here'
            className='bg-[#DADADA] w-full mt-3 rounded-full border border-black px-5 py-1'
            required
          />
          <button type='submit' className='bg-black w-full text-white rounded-full mt-3 py-2 font-medium'>Submit</button>
          <p className='opacity-[54%] mt-3 font-medium text-sm'>Want ONLYBEES on Your Creative Project?</p>
          <p className='opacity-[54%] font-light text-sm'>Enter your email and we will get back to you!</p>
        </form>
      </div>
    </div>
  )
}

export default HeroSection