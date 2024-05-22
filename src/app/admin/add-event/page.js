'use client';

import { useState } from 'react';

import styles from '../admin.module.css';

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
                alert('Event created successfully!');
            } else {
                alert('Error creating event');
            }
        } catch (error) {
            console.error(error);
            alert('Error creating event');
        }
    };

    return (
        <div className='lg:mx-0 mx-5 py-5'>
            <h2 className='my-10 text-center text-5xl font-medium '>Add Event</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="organizer">Event Organizer</label>
                <input className={styles.input} type="text" name="organizer" value={form.organizer} onChange={handleChange} placeholder="Organizer" required />
                
                <label className={styles.label} htmlFor="title">Event Title</label>
                <input className={styles.input} type="text" name="title" value={form.title} onChange={handleChange} placeholder="Event Title" required />

                <label className={styles.label} htmlFor="about">About</label>
                <textarea className={styles.textarea} name="about" value={form.about} onChange={handleChange} placeholder="About" required></textarea>

                <label className={styles.label} htmlFor="venue">Venue</label>
                <input className={styles.input} type="text" name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" required />

                <label className={styles.label} htmlFor="city">City</label>
                <input className={styles.input} type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required />

                <label className={styles.label} htmlFor="date">Date</label>
                <input className={styles.input} type="date" name="date" value={form.date} onChange={handleChange} required />

                <label className={styles.label} htmlFor="image">Event Flyer</label>
                <input className={styles.inputFile} type="file" name="image" onChange={handleImageChange} required />

                <label className={`${styles.label} mt-5`} htmlFor="quantity">Ticket Quantity</label>
                <input className={styles.input} type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />

                <label className={styles.label} htmlFor="ticketPrice">Ticket Price</label>
                <input className={styles.input} type="number" name="ticketPrice" value={form.ticketPrice} onChange={handleChange} placeholder="Ticket Price" required />

                <button className={styles.button} type="submit">Add Event</button>
            </form>
        </div>
    );
}
