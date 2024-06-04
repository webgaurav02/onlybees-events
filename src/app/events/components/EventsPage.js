"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

//Components
import Loading from '@/app/components/Loading';
import EventItem from './EventItem';
import CityModal from './CityModal';


//Assets
import arrow from "../../../../public/arrow-right-stroke.svg"

const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const fetchEvents = async (city) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/events/fetchevents${city ? `?city=${city}` : ''}`);
            const result = await response.json();
            if (result.success) {
                setEvents(result.data);
                setLoading(false);
            } else {
                console.error('Error fetching events:', result.error);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCities = async () => {
        try {
            const response = await fetch(`/api/events/fetchcities`);
            const result = await response.json();
            if (result.success) {
                setCities(result.data);
            } else {
                console.error('Error fetching cities:', result.error);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    useEffect(() => {
        fetchEvents(selectedCity);
    }, [selectedCity]);

    useEffect(() => {
        fetchCities();
    }, []);


    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setIsModalOpen(false);
    };


    return (
        <div className='text-white lg:py-20 lg:px-60 py-10 px-10'>
            {loading && <Loading />}
            <div className='flex gap-2 cursor-pointer lg:mb-20 mb-12' onClick={() => setIsModalOpen(true)}>
                <a className='font-medium lg:text-base text-sm'>Find your city</a>
                <Image
                    src={arrow}
                    height={15}
                    width="auto"
                    alt="Find your city"
                />
            </div>
            <div className="events grid w-full mt-5" style={{ scrollbarWidth: 'none' }}>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mx-auto">
                    {events.map((event, index) => (
                        <div key={index} className="">
                            <EventItem
                                key={index}
                                eventItem={event}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <CityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cities={cities}
                onSelectCity={handleSelectCity}
            />
        </div>
    )
}

export default EventsPage