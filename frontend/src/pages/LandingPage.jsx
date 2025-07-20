import React from 'react'
import Navbar from '../components/Landing/Navbar'
import Heropage from '../components/Landing/Heropage'
import HowitWorks from '../components/Landing/HowitWorks'
import Services from '../components/Landing/Services'
import Ourrates from '../components/Landing/Ourrates'
import Footer from '../components/Landing/Footer'

const LandingPage = () => {
  return (
    <div className='relative'>
        <Navbar/>
        <Heropage/>
        <Services/>
        <HowitWorks/>
        <Ourrates/>
        <Footer/>    
    </div>
  )
}

export default LandingPage