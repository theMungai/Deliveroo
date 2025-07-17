<<<<<<< HEAD

import './App.css';
import './index.css';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import User_SignUp from './pages/UserLogin_SignUp.jsx';
import Admin_SignUp from './pages/AdminLogin_SignUp.jsx';
import Profile from './pages/Profile.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ShippingDetails from './pages/ShippingDetails.jsx';
=======
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
>>>>>>> 8979de3 (Creates User dashboard and Admin Panel)


function App() {
  return (
    <>
<<<<<<< HEAD

      {/* Optional wrapper div if needed */}
      <div className="bg-gray-100 font-impact min-h-screen">
        <LandingPage />
      </div>

=======
      <Layout>
        <Dashboard />
      </Layout>
>>>>>>> 8979de3 (Creates User dashboard and Admin Panel)
    </>
  );
}

export default App;
