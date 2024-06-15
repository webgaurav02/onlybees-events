
import React, { useEffect, useState } from 'react'

//Components



const CheckoutContainer = ({ totalAmt, handleCheckout, page, setPage, subtotal, tickets }) => {

  const [anySelected, setAnySelected] = useState(false)

  useEffect( () => {
    const selectedTickets = tickets.filter(ticket => ticket.selected >= 1);
    if(selectedTickets.length > 0){
        setAnySelected(true)
    }
    else{
      setAnySelected(false)
    }
  }, [tickets])

  const handleButton = () => {
    if(page === "ticket" && anySelected){
      // handleTotal();
      setPage("details")
    }
    else if(page === "details" && totalAmt!==0){
      handleCheckout();
    }
  }


  return (
    <div className=' py-5 md:px-80 px-10 fixed flex flex-row justify-between items-center bottom-0 lg:h-[13vh] h-[10vh] w-screen bg-[#1b1b1b] text-white rounded-t-3xl'>
        <div className=' flex flex-col gap-0'>
            <span className='text-[0.7rem]'>Total:</span>
            <h1 className='text-3xl'>₹{(page==='ticket'?subtotal:totalAmt)}</h1>
        </div>
        <div>
            <button className={`${!anySelected?"opacity-50":""} py-3 px-7 bg-[#00FF38] text-black font-medium rounded-full`} onClick={handleButton}>{(page==='ticket'?"Proceed":"Checkout")}</button>
        </div>
    </div>
  )
}

export default CheckoutContainer