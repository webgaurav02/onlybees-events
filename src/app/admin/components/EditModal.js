import React, { useState, useEffect } from 'react';
import Image from 'next/image';

//Components
import Loading from '@/app/components/Loading';


const EditModal = ({ event, onClose, onSave }) => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        id: '',
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

    let date = new Date(event.date);
    let formattedDate = date.toLocaleString('en-GB');

    useEffect(() => {
        setForm({
            id: event._id,
            organizer: event.organizer,
            title: event.title,
            about: event.about,
            venue: event.venue,
            city: event.city,
            date: event.date,
            image: event.imageUrl,
            quantity: event.quantity,
            ticketPrice: event.ticketPrice,
        });
    }, [event]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(event.id, form);
    };

    return (
        <div className="lg:mx-0 mx-5 py-5">
            {loading && <Loading />}
            <h2 className="my-10 lg:ml-16 ml-5 text-5xl font-normal">Edit Event - <span className='font-bold'>{event.title}</span></h2>
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

                        <label className="mb-1 font-bold" htmlFor="date">Date<span className='text-[0.7rem] text-[#00FF38] font-normal'> (Do not change if same)</span></label>
                        <p className='text-xs text-[#00FF38]'>{formattedDate}</p>
                        <input
                            className="mt-1 mb-4 p-2 border bg-[#1b1b1b] border-gray-800 rounded"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                        />

                        <label className="mb-1 font-bold" htmlFor="quantity">Ticket Quantity</label>
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
                    <div className='flex flex-col w-4/3'>
                        <label className="mb-1 font-bold" htmlFor="image">Change Event Flyer<span className='text-[0.7rem] text-[#00FF38] font-normal'> (Do not Re-upload if same)</span></label>
                        <Image
                            src={(form.image!=='')?form.image:event.imageUrl}
                            loading="lazy"
                            width={300}
                            height={300}
                            // sizes="100vw"
                            // className=" w-full object-cover"
                            alt="Event Flyer"
                            style={{ "boxShadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", "borderRadius": "8px" }}
                        />
                        <input
                            className="my-4 text-[#00FF38]"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />

                    </div>
                </div>
                <div className="flex justify-start gap-4 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-700 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#00FF38] text-black rounded"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;
