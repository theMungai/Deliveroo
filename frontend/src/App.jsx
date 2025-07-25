import './App.css';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import User_SignUp from './pages/UserLogin_SignUp.jsx';
import Admin_SignUp from './pages/AdminLogin_SignUp.jsx';
import Profile from './pages/Profile.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ShippingDetails from './pages/ShippingDetails.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/user-signup" element={<User_SignUp />} />
          <Route path="/admin-signup" element={<Admin_SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shipping-details/:id" element={<ShippingDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
