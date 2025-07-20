import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faCubes, faHeadset } from "@fortawesome/free-solid-svg-icons";

function Service({icon, serviceName, description}){
    return(
        <div className='services bg-white shadow rounded-[10px] px-10 py-5'>
            <FontAwesomeIcon  icon={icon} className='text-[#73C322] text-3xl' />
            <h2 className='text-[18px] font-[700] my-3'>{serviceName}</h2>
            <p className='text-[16px] font-[500]'>{description}</p>
        </div>
    )
}

function Services(){
  return (
    <div className='text-center my-[105px]'>
        <h1 className='text-[28px] font-[700] mb-3 '>Our Services</h1>
        <p className='font-[500] text-[16px] mb-12'>We offer a range services to meet your needs</p>
        <div className='flex w-[80%] mx-auto justify-between gap-x-10'>
            <Service icon={faTruckFast} serviceName="Fast Delivery" description="Get your packages delivered in the shortest time possible."/>
            <Service icon={faCubes} serviceName="Secure Packaging" description="We ensure your packages are handles with utmost care."/>
            <Service icon={faHeadset} serviceName="24/7 Support" description="Our team is always here to help you with any queries."/>

        </div>

    </div>
  )
}

export default Services