import React from 'react'
import Image from 'next/image';

const Ticket = ({ event }) => {


  //To get formatted date
  const options = {
    weekday: 'short', // Fri
    year: 'numeric',
    month: 'short', // May
    day: '2-digit', // 31
  };
  const date2 = new Date(event.date);
  const formattedDate = date2.toLocaleString('en-US', options);

  return (
    <div className='py-20 flex flex-col items-center justify-center'>
      <div className='md:w-[60vw] w-[82vw]'>
        <div className='flex flex-row gap-4 justify-center'>
          <div className="p-0 flex flex-col justify-between h-[120px]">
            <p className="lg:mt-3 text-right text-xl font-bold mb-1">{event.title}</p>
            <p className="text-right text-sm font-light mb-1">{event.venue}</p>
            <p className="text-right text-sm text-[#00FF38] mb-1">{formattedDate}</p>
            <p className="text-right text-sm">{event.city}</p>
          </div>
          <div className="flyer aspect-w-1 aspect-h-1">
            <Image
              src={event.imageUrl}
              loading="lazy"
              width={150}
              height={150}
              alt="Event Flyer"
              className='rounded-[9px] mr-10'
            />
          </div>
        </div>
        <div className='h-[80vh] mt-16 bg-white rounded-lg'>

        </div>
      </div>
    </div>
  )
}

export default Ticket