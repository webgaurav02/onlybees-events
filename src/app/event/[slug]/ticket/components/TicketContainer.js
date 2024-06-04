"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

//Components
import Loading from '@/app/components/Loading';



const TicketContainer = (props) => {

    const { slug } = props;

    //States
    const [eventData, setEventData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    //To get event data from database though eventinfo API
    const fetchEventData = async (slug) => {
        setIsLoading(true);
        const res = await fetch(`/api/events/eventinfo?slug=${slug}`);
        const dataRecv = await res.json();

        if (!dataRecv.success) {
            setIsLoading(false);
            throw new Error('Event not found');
        }
        setIsLoading(false);
        return dataRecv.data;
    }

    useEffect(() => {
        fetchEventData(slug)
            .then(setEventData)
            .catch(setError);
    }, [slug]);

    

    if(isLoading)
        return <Loading />

    return (
        <div className='min-h-[90svh] flex md:flex-row p-10'>
            <div className='w-[20vw] flex md:flex-col flex-row'>
                <Image 
                    src={eventData.imageUrl}
                    height={300}
                    width={300}
                    className='md:rounded-[15px]'
                    alt='Event flyer'
                />
                <div className='md:text-center'>
                    <h1>{eventData.title}</h1>
                    <h2>{eventData.venue}</h2>
                    <h2>{eventData.date}</h2>
                </div>
            </div>
        </div>
    )
}

export default TicketContainer;