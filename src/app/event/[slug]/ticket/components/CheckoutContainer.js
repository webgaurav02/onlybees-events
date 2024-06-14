
import React from 'react'

//Comonents
import Button from '@/app/components/Button'


const CheckoutContainer = ({ totalAmt, handleCheckout }) => {
  return (
    <div className=' py-5 md:px-80 px-10 fixed flex flex-row justify-between items-center bottom-0 lg:h-[13vh] h-[10vh] w-screen bg-[#1b1b1b] text-white'>
        <div className=' flex flex-col gap-0'>
            <span className='text-[0.7rem]'>Total:</span>
            <h1 className='text-3xl'>₹{totalAmt}</h1>
        </div>
        <div>
            <button className='py-3 px-7 bg-[#00FF38] text-black font-medium rounded-full' onClick={handleCheckout}>Checkout</button>
        </div>
    </div>
  )
}

export default CheckoutContainer