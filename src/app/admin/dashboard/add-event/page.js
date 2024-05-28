'use client';

import Loading from '@/app/components/loading';
import { useState } from 'react';


export default function AddEvent() {
    const [form, setForm] = useState({
        organizer: '',
        title: '',
        about: '',
        venue: '',
        city: '',
        date: '',
        image: '',
        quantity: 0,
        ticketPrice: 0,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prevForm) => ({ ...prevForm, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await fetch('/api/events/addevent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
                setLoading(false);
                alert('Event created successfully!');
            } else {
                setLoading(false);
                alert('Error creating event');
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert('Error creating event');
        }
    };


    return (
        <div className="lg:mx-0 mx-5 py-5">
            {loading && <Loading />}
            <h2 className="my-10 lg:ml-16 ml-5 text-5xl font-medium">Add Event</h2>
            <form
                className="w-full mx-auto p-5 lg:px-16"
                onSubmit={handleSubmit}
            >
                <div className='flex lg:flex-row flex-col lg:gap-12'>
                    <div className='flex flex-col w-full'>
                        <label className="mb-1 font-bold" htmlFor="organizer">Event Organizer</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="text"
                            name="organizer"
                            value={form.organizer}
                            onChange={handleChange}
                            placeholder="Organizer"
                            required
                        />
                        
                        <label className="mb-1 font-bold" htmlFor="title">Event Title</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Event Title"
                            required
                        />

                        <label className="mb-1 font-bold" htmlFor="about">About</label>
                        <textarea
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            placeholder="About"
                            required
                        ></textarea>

                        <label className="mb-1 font-bold" htmlFor="venue">Venue</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="text"
                            name="venue"
                            value={form.venue}
                            onChange={handleChange}
                            placeholder="Venue"
                            required
                        />

                        <label className="mb-1 font-bold" htmlFor="city">City</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                        />
                    </div>
                    <div className='flex flex-col w-4/3'>
                        <label className="mb-1 font-bold" htmlFor="date">Date</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />

                        <label className="mb-1 font-bold" htmlFor="image">Event Flyer</label>
                        <input
                            className="mb-4 text-[#00FF38]"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            required
                        />

                        <label className="mt-5 mb-1 font-bold" htmlFor="quantity">Ticket Quantity</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            required
                        />

                        <label className="mb-1 font-bold" htmlFor="ticketPrice">Ticket Price</label>
                        <input
                            className="mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="number"
                            name="ticketPrice"
                            value={form.ticketPrice}
                            onChange={handleChange}
                            placeholder="Ticket Price"
                            required
                        />
                    </div>
                </div>
                <button
                    className="mt-5 p-2 px-12 bg-[#00FF38] text-black font-medium rounded cursor-pointer"
                    type="submit"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
}
