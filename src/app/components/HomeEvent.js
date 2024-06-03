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

    //Get lowest of all ticket prices
    const getStartingPrice = () => {
        const prices = Object.values(props.eventItem.ticketPrice).map(phase => phase.price);
        const minPrice = Math.min(...prices);
        return minPrice === 0 ? 'Free Onwards' : `From ₹${minPrice}`;
    };


    return (
        <Link
            href={`/event/${props.eventItem.slug}`}
            passHref
        >
            <div className=' w-56 h-auto px-0'>
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
                <div className=' pl-3 text-left mt-3 font-medium text-[#121212] text-sm lg:text-sm lg:leading-snug'>{formattedDate}</div>
                <div className=' pl-3 text-left  font-semibold font-blogger text-xl lg:text-xl lg:leading-snug'>{props.eventItem.title}</div>
                <div className=' pl-3 text-left font-medium text-[#3a3a3a] text-sm lg:text-sm lg:leading-snug '>{props.eventItem.venue}</div>
                <div className=' pl-3 text-left font-semibold text-[#3a3a3a] text-base lg:text-sm lg:leading-snug mt-1'>{getStartingPrice()}</div>
            </div>
        </Link>
    )
}

export default HomeEvent