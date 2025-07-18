import React from 'react';
import ProfileCard from '../components/ProfileCard';
import RecentOrders from '../components/RecentOrders';
import Layout from '../components/Layout'

function Profile() {
  return (
    <>
    <Layout>
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto my-8 grid grid-cols-1 md:grid-cols-2 gap-">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>
        <p className="text-gray-600 mb-8">View your account details and recent activity.</p>
        <ProfileCard />
      </div>
      <RecentOrders />
    </div>
    </Layout>
    </>
  );
}

export default Profile;