
import './App.css';
import './index.css';
import { useState } from 'react';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import User_SignUp from './pages/UserLogin_SignUp.jsx';
import Admin_SignUp from './pages/AdminLogin_SignUp.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <>
      {/* Optional wrapper div if needed */}
      <div className="bg-gray-100 font-impact min-h-screen">
        <Layout>
          {/* Add routing or switching logic as needed */}
          <NewOrder />
          <Dashboard />
        </Layout>

        {/* Standalone components */}
        <User_SignUp />
        <Admin_SignUp />
        <Profile />
      </div>
    </>
  );
}

export default App;
