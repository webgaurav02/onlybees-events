"use client"

// Context
import { useAuth } from '@/context/AuthContext';

//Components
import TicketItem from "./components/TicketItem";

const MyTickets = () => {

  const { user } = useAuth();

  if(user.userData)
    console.log(user.userData.bookings)

  return (
    <div className='text-white py-10 px-5'>
      <h1 className="text-5xl mb-5 md:ml-[20vw]">Tickets</h1>
      {user?.userData?.bookings?.map((booking, index) => (
        <TicketItem
          key={index}
          booking={booking}
        />
      ))}
    </div>
  )
}

export default MyTickets