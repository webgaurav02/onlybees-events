"use client"

import React, { useEffect } from 'react'

//Components
// import Navbar from '@/app/components/NavbarTicket'
import Footer from '@/app/components/Footer'
import TicketPage from './components/TicketPage'
// import TicketContainer from './components/TicketContainer';

//Comtext
import { useEvent } from '@/context/EventContext';
import Loading from '@/app/components/Loading';
import EventNotFound from '@/app/components/EventNotFound';


const Ticket = ({ params }) => {

    const { slug } = params;
    const { eventData, fetchEventData, isLoading, error } = useEvent();

    useEffect(() => {
        if (!eventData) {
            fetchEventData(slug);
        }
    }, [slug, fetchEventData]);

    // console.log(slug);


    return (
        <div className="bg-black text-white">
            {error && <EventNotFound />}
            {isLoading && <Loading />}
            {!error && !isLoading && eventData && <TicketPage event={eventData} slug={slug} />}
        </div>
    )
}

export default Ticket