import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const HomeEvent = (props) => {

    const options = {
        weekday: 'short', // Fri
        year: 'numeric',
        month: 'short', // May
        day: '2-digit', // 31
    };
    const date = new Date(props.eventItem.date);
    const formattedDate = date.toLocaleString('en-US', options);

    return (
        <Link
            href={`/${props.eventItem.route}`}
            passHref
        >
            <div className=' w-48 h-auto px-0'>
                <Image
                    src={(props.eventItem.imageUrl !== null) ? props.eventItem.imageUrl : ""}
                    loading="lazy"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    alt="Event Flyer"
                    style={{ "boxShadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", "borderRadius": "8px" }}
                />
                <div className=' pl-2 text-left mt-2 font-semibold font-blogger text-xl lg:text-xl lg:leading-snug'>{props.eventItem.title}</div>
                <div className=' pl-2 text-left font-medium opacity-70 text-[#3f362b] text-sm lg:text-sm lg:leading-snug '>{formattedDate}</div>
                <div className=' pl-2 text-left font-medium opacity-70 text-[#3f362b] text-sm lg:text-sm lg:leading-snug '>{props.eventItem.venue}</div>
                <div className=' pl-2 text-left font-medium opacity-70 text-[#3f362b] text-sm lg:text-sm lg:leading-snug '>&#8377;{props.eventItem.ticketPrice}</div>
            </div>
        </Link>
    )
}

export default HomeEvent