"use client";

import React from 'react'
import { useEffect, useState } from 'react';

//Components
import EventCard from "../../components/EventCard"

const EditEvent = () => {

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

    if (loading) return <p>Loading...</p>;


    return (
        <div className="lg:mx-0 mb-5 pb-5">
            <h2 className="mb-10 text-center p-2 lg:text-5xl text-3xl font-semibold">Edit Event</h2>
            <div className="events grid w-full mt-5 px-10" style={{ scrollbarWidth: 'none' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {events.map((event, index) => (
                        <div key={index} className="">
                            <EventCard
                                key={event}
                                id={event._id}
                                image={event.imageUrl}
                                title={event.title}
                                date={event.date}
                                venue={event.venue}
                                price={event.price}
                                route={event.route}
                                delete={false}
                                edit={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EditEvent