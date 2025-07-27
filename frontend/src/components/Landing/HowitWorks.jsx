import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Send } from 'react-feather'

function Step({icon, title, description}){
    return(
        <div className='px-10 py-5 sm:px-5 sm:py-2.5 md:px-10 md:py-5 '>
            <div className='how-it-works text-[#73C322] relative mb-6 text-3xl'>{icon}</div>
            <h2 className='text-[18px] font-[700] mt-6 mb-3'>{title}</h2>
            <p className='text-[16px] font-[500]'>{description}</p>
        </div>
    )
}

function HowitWorks() {
  return (
    <div className=' bg-white px-[130px] max-xs:px-[20px] xs:px-[20px] sm:px-[40px] md:px-[100px] lg:px-[130px] py-[110px] text-center'>
        <h1 className='text-[28px] font-[700] mb-3'>How it Works</h1>
        <p className='font-[500] text-[16px] mb-12'>Sending a parcel is as easy as 1,2,3</p>
        <div className='flex w-[80%] mx-auto justify-between gap-x-10 max-xs:flex-col xs:flex-col sm:flex-row sm:w-[90%] md:w-4/5'>
            <Step icon={<FontAwesomeIcon icon={faUserPlus} />} title="1. Create Order" description="Fill the parcel and recipient details to start" />

            <Step icon={<FontAwesomeIcon icon={faTruckFast}/>} title="2. We pick Up" description="Our courier will come to your specific location" />

            <Step icon={<Send className='relative left-1/2' size="30px" />} title="3. Delivered Safely" description="Track your parcel in real time until it reaches its destination" />

        </div>
    </div>
  )
}

export default HowitWorks