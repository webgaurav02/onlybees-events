"use client"

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import './globals.css';
import HomeEvent from './components/HomeEvent';
import { useState, useEffect } from 'react';
// import HeroSection from './Components/HeroSection';



const page = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events/fetchevents');
      const result = await response.json();
      if (result.success) {
        setEvents(result.data);
      } else {
        console.error('Error fetching events:', result.error);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);



  return (
    <div className='home-page'>

      <Navbar mode="light" />

      {/* <HeroSection /> */}

      <div className='py-10 home-page'>
        <h2 className='text-black font-semibold text-2xl lg:text-3xl my-5 ml-10'>Explore Events</h2>

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
        <p className='text-right mr-7 text-[#8B8A8A] text-sm mt-3'>view all</p>

      </div>

      <Footer mode="light" />
    </div>
  )
}

export default page