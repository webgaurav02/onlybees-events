"use client"

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import './globals.css';
import HomeEvent from './components/HomeEvent';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import arrow from "../../public/arrow-right-stroke-dark.svg";
import Image from 'next/image';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const scrollAnimationFrameRef = useRef(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/fetchevents`);
      const result = await response.json();
      if (result.success) {
        let fetchedEvents = result.data;
        if (fetchedEvents.length < 20) {
          const repeatedEvents = [...fetchedEvents];
          while (fetchedEvents.length < 20) {
            fetchedEvents = fetchedEvents.concat(repeatedEvents).slice(0, 20);
          }
        } else {
          fetchedEvents = fetchedEvents.slice(0, 20);
        }
        setEvents([...fetchedEvents, ...fetchedEvents]); // Duplicate events for infinite scroll illusion
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

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const smoothScroll = () => {
      if (scrollContainer) {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 0.5; // Adjust this value for smoother scrolling speed
        }
      }
      scrollAnimationFrameRef.current = requestAnimationFrame(smoothScroll);
    };

    const startAutoScroll = () => {
      scrollAnimationFrameRef.current = requestAnimationFrame(smoothScroll);
    };

    const stopAutoScroll = () => {
      if (scrollAnimationFrameRef.current) {
        cancelAnimationFrame(scrollAnimationFrameRef.current);
      }
    };

    if (!loading) {
      startAutoScroll();

      scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        }
      });

      scrollContainer.addEventListener('mouseover', stopAutoScroll);
      scrollContainer.addEventListener('mouseout', startAutoScroll);

      return () => {
        stopAutoScroll();
        scrollContainer.removeEventListener('mouseover', stopAutoScroll);
        scrollContainer.removeEventListener('mouseout', startAutoScroll);
      };
    }
  }, [loading]);

  if (loading) return <Loading />;

  return (
    <div className='home-page bg-white text-black min-h-[100svh] overflow-x-hidden'>
      <Navbar mode="light" />
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
        <div ref={scrollContainerRef} className="events flex w-screen overflow-x-scroll pr-5" style={{ scrollbarWidth: 'none' }}>
          {events.map((event, index) => (
            <div key={index} className="py-3 ml-10 md:ml-7 hover:scale-105 transform transition duration-100">
              <HomeEvent
                key={index}
                eventItem={event}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer mode="light" />
    </div>
  );
}

export default Home;
