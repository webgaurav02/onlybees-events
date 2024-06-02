"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

// Styles
import "./EventDetails.css";

//Images
// import flyer from "../../../public/mm11.png"

// Components
import Button from './Button';

// import { useRouter } from 'next/navigation';


const EventDetails = (props) => {

    const { event } = props;

    const [windowWidth, setWindowWidth] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    
    //To get formatted date
    const options = {
        weekday: 'short', // Fri
        year: 'numeric',
        month: 'short', // May
        day: '2-digit', // 31
    };
    const date2 = new Date(props.event.date);
    const formattedDate = date2.toLocaleString('en-US', options);


    // const router = useRouter();

    
    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        // Set initial value
        updateWindowWidth();

        // Add event listener for window resize
        window.addEventListener('resize', updateWindowWidth);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);
    useEffect(() => {
        // Decide which type of device
        const mobileBreakpoint = 768; // Example breakpoint for mobile devices
        if (windowWidth <= mobileBreakpoint) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [windowWidth]);



    //Get lowest of all ticket prices
    const getStartingPrice = () => {
        // console.log(event, "\n");
        // console.log(event.ticketPrice);
        const prices = Object.values(event.ticketPrice).map(phase => phase.price);
        const minPrice = Math.min(...prices);
        return minPrice === 0 ? 'Free' : `₹${minPrice}`;
    };


    return (
        <div className="event-container bg-black">
            <div className="my-16 flex lg:flex-row flex-col-reverse gap-6">

                {/* LEFT */}
                <div className="flex min-w-[50%] flex-col left gap-6">

                    <div className="p-0 leading-8">
                        <h2 className="lg:ml-0 ml-3 lg:text-right text-left text-5xl font-bold mb-2">{event.title}</h2>
                        <p className="lg:ml-0 ml-3 lg:text-right text-left font-light">{event.venue}</p>
                        {<h3 className="lg:ml-0 ml-3 lg:text-right text-left text-xl text-[#00FF38]">{formattedDate} <span className="font-light text-sm">{isMobile?<br />:""}GMT +5:30</span></h3>}
                        <div className="lg:ml-0 ml-3 flex lg:gap-16 gap-10 lg:justify-end">
                            {/* <p>Tag</p> */}
                            <p>{event.city}</p>
                        </div>
                    </div>

                    <div className="scroll-about-text">
                        <h3 className="lg:text-right ml-2 text-xl font-bold leading-10">About</h3>
                        <div className="overflow-scroll about-text p-4 rounded-2xl min-w-full">
                            <p className="lg:text-right leading-7">{event.about}</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col right gap-6">

                    <div className="flyer aspect-w-1 aspect-h-1">
                        <Image
                            src={event.imageUrl}
                            priority
                            width={900}
                            height={900}
                            alt="Event Flyer"
                        />
                    </div>

                    <div className="btn-container flex lg:flex-row flex-col p-7 lg:gap-10 gap-4 bg-[#1e1e1e] justify-center rounded-3xl">
                        <div className="leading-0 price">
                            <p className="font-semibold lg:text-[0.6rem] text-[0.8rem] lg:ml-0">STARTING</p>
                            <p className="font-semibold lg:text-4xl text-6xl">{getStartingPrice()}</p>
                        </div>
                        <Button link={`/event/${props.slug}/ticket`}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EventDetails