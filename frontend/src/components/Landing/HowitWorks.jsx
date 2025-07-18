import React from 'react'

const HowitWorks = () => {
  return (
    <div >
        <h1>How it Works</h1>
        <p>Sending a parcel is as easy as 1,2,3</p>
        <div className='flex'>
            <div >
                <h2>1. Create Order </h2>
                <p>Fill the parcel and recipient details to start</p>
            </div>
            <div>
                <h2>2. We pick Up</h2>
                <p>Our courier will come to your specific location</p>   
            </div>
            <div>
                <h2>3. Delivered Safely</h2>
                <p>Track your parcel in real time until it reaches its destination</p>
            </div>
        </div>
    </div>
  )
}

export default HowitWorks