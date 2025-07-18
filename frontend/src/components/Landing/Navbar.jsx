import React from 'react'

const Navbar = () => {
  return (
    <div className= 'flex justify-between'>
        <p className='font-bold text-black text-2xl p-8'>
            Deliveroo
        </p>
        <ul className='flex gap-10 font-light text-black p-8'>
            <li className=' hover:bg-green-500 hover:text-white rounded'>
                Our Services
            </li>
            <li className='hover:bg-green-500 hover:text-white rounded'>
                How It Works
            </li>
            <li className='hover:bg-green-500 hover:text-white rounded'>
                Rates
            </li>
            <li className='hover:bg-green-500 hover:text-white rounded'>
                Contact Us
            </li>
        </ul>
        <div className='flex gap-4 items-center p-8'>
            <button className='font-light border-green-500  hover:bg-green-500 hover:border-transparent text-black py-1 px-4 rounded'>
                Login
            </button>
            <button className='font-light border-green-500  hover:bg-green-500 hover:border-transparent text-black py-1 px-4 rounded'>
                Register
            </button>
            <button className='font-light border-green-500  hover:bg-green-500 hover:border-transparent text-black py-1 px-4 rounded'>
                Admin
            </button>
        </div>
    </div>
  )
}

export default Navbar