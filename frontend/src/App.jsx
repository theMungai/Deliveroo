import './index.css';
import { useState } from 'react'
import Layout from './components/Layout'
import User_SignUp from './pages/UserLogin_SignUp.jsx';
import Admin_SignUp from './pages/AdminLogin_SignUp.jsx';
import Profile from './pages/Profile.jsx'

function App() {

  return (
    <>
    <div className=" bg-gray-100 flex items-center justify-center font-impact"></div>
      <User_SignUp/>
      <Admin_SignUp/> 
      <Profile/>
    </>
  )
}

export default App
