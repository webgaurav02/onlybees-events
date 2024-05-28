import Image from 'next/image'
import { useState } from 'react';

import CustomConfirmationPrompt from './CustomConfirmationPrompt';


const HomeEvent = (props) => {

    const deleteEvent = () => {
        props.handleDeleteConfirmation(props.id);
    }

    const editEvent = () => {
        alert(props.id);
    }

    const options = {
        weekday: 'short', // Fri
        year: 'numeric',
        month: 'short', // May
        day: '2-digit', // 31
    };
    const date = new Date(props.date);
    const formattedDate = date.toLocaleString('en-US', options);

    return (
        <div className=' w-48 h-auto px-0'>
            <Image
                // priority
                src={props.image}
                loading="lazy"
                width="0"
                height="0"
                sizes="100vw"
                className="h-full w-full object-cover"
                alt="Event Flyer"
                style={{ "boxShadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", "borderRadius": "8px" }}
            />
            <div className=' pl-2 text-left mt-2 font-semibold text-xl lg:text-2xl lg:leading-snug'>{props.title}</div>
            <div className=' pl-2 text-left font-medium opacity-70 text-white text-sm lg:text-sm lg:leading-snug '>{formattedDate}</div>
            <div className=' pl-2 text-left font-medium opacity-70 text-white text-sm lg:text-sm lg:leading-snug '>{props.venue}</div>
            <div className=' pl-2 text-left font-medium opacity-70 text-white text-sm lg:text-sm lg:leading-snug '>{props.price}</div>
            {props.delete === true && <button className='pl-2 font-medium bg-none text-red-600' onClick={deleteEvent}>delete</button>}
            {props.edit === true && <button className='pl-2 font-medium bg-none text-[#00FF38]' onClick={editEvent}>edit</button>}

            {props.showConfirmation && (
                <CustomConfirmationPrompt
                    message="Type 'delete' to confirm deletion:"
                    onConfirm={props.handleConfirmDelete}
                    onCancel={props.handleCancelDelete}
                />
            )}

        </div>

    )
}

export default HomeEvent