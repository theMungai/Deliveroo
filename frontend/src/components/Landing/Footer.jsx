import React from 'react';


const Footer = () => {
  return (
    <>
    <div className='flex justify-between p-20 bg-black text-white'> 
        <div>
            <h1 className='text-2xl font-bold text-green-500'>Deliveroo</h1>
            <p className=''>123 Jogoo Road, Nairobi</p>
            <p className=''>+254 795 482 911</p>
            <p className=''>deliveroo@gmail.com</p>
        </div>
        <div className='justify-center'>
            <p className='font-bold'>Quick Links</p>
            <p className='font-bold'>Our Services</p>
            <p className='font-bold'>Our Services</p>
            <p className='font-bold'>How it Works</p>
            <p className='font-bold'>Home</p>
        </div>
        <div>
            <p className='font-bold'>Start shipping with us today!</p>
            <button className='bg-green-500 text-white py-1 px-4 rounded'>Start Now </button>
        </div>
        <div>
            
        </div>
    </div>
    <div className='flex justify-center p-4 bg-black text-white'>
        <p>© 2023 Deliveroo. All rights reserved.</p>
    </div>
    </>
  )
}

export default Footer