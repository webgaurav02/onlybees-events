"use client"

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import './globals.css';
import HomeEvent from './components/HomeEvent';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import arrow from "../../public/arrow-right-stroke-dark.svg"
import Image from 'next/image';


// import HeroSection from './Components/HeroSection';



const page = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events/fetchevents');
      const result = await response.json();
      if (result.success) {
        setLoading(false);
        setEvents(result.data);
      } else {
        setLoading(false);
        console.error('Error fetching events:', result.error);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading)
    return <Loading />

  return (
    <div className='home-page'>

      <Navbar mode="light" />

      {/* <HeroSection /> */}

      <div className='pt-10 pb-20 home-page'>
        
        <div className='flex flex-row justify-between'>
          <h2 className='text-black font-semibold text-2xl lg:text-3xl my-5 ml-10'>Explore Events</h2>
          <Link href="/events" className='flex flex-row items-center gap-2 text-[#8B8A8A] text-sm md:mr-20 mr-5'>
            <p>view all</p>
            <Image
              src={arrow}
              width={10}
              height="auto"
              alt="view all events"
              className=''
            />
          </Link>
        </div>
        
        
        <div className="events flex w-screen overflow-x-scroll mt-5 pr-5" style={{ scrollbarWidth: 'none' }}>
          {events.map((event, index) => (
            <div key={index} className="ml-10">
              <HomeEvent
                key={index}
                // img={teams.coreTeam[index].img}
                eventItem={event}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer mode="light" />
    </div>
  )
}

export default page