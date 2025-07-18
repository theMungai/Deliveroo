import React from 'react'

const Ourrates = () => {
  return (
    <div>
        <h1>Our Rates</h1>
        <p>Transparent and competitive pricing for all your needs</p>
        <div className='flex' style={{gap: '500px'}}>
            <div className= 'justify-between'>
                <h1>Light Weight</h1>
                <h1>Ksh.300/parcel</h1>
                <p>1-3 Business Days</p>
                <p>Upto 5kgs</p>
                <p>Real-time Tracking</p>
                <button>Choose Plan</button>
            </div>
            <div>
                <h1>Medium Weight</h1>
                <h1>Ksh.500/parcel</h1>
                <p>1-3 Business Days</p>
                <p>Upto 10kgs</p>
                <p>Real-time Tracking</p>
                <button>Choose Plan</button>
            </div>
            <div>
                <h1>Heavy Weight</h1>
                <h1>Ksh.1000/parcel</h1>
                <p>1-3 Business Days</p>
                <p>Upto 25kgs</p>
                <p>Real-time Tracking</p>
                <button>Choose Plan</button>

            </div>
        </div>
    </div>
  )
}

export default Ourrates