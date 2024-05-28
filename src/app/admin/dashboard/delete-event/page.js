"use client";

import React from 'react'
import { useEffect, useState } from 'react';

//React Toastify
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import EventCard from "../../components/EventCard"
import Loading from '@/app/components/loading';


const DeleteEvent = () => {

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

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }


    const handleDeleteConfirmation = (id) => {
        setEventToDelete(id)
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async (confirmation) => {
        if (confirmation === 'delete') {
            // Call API to delete the event
            setLoading(true);
            try {
                const res = await fetch('/api/events/deleteevent', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: eventToDelete }),
                });
                const data = await res.json();
                if (data.success) {
                    setLoading(false);
                    fetchEvents();
                    toast.success('Deleted successfully!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
                else {
                    setLoading(false);
                    showErrorToast('Some error occured!');
                }
            } catch (error) {
                setLoading(false);
                console.error(error);
                showErrorToast('Some error occured!');
            }
            // Optionally, you can add logic to refresh the event list or update the UI
        } else {
            setLoading(false);
            showErrorToast('Confirmation failed!');
        }
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };



    return (
        <div className="lg:mx-0 mx-5 pb-5">
            {loading && <Loading />}
            <h2 className="mb-10 text-center p-2 lg:text-5xl text-3xl font-semibold">Delete Event</h2>
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

                                delete={true}
                                handleDeleteConfirmation={handleDeleteConfirmation}
                                handleConfirmDelete={handleConfirmDelete}
                                handleCancelDelete={handleCancelDelete}
                                showConfirmation={showConfirmation}
                                setEventToDelete={setEventToDelete}

                                edit={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    )
}

export default DeleteEvent