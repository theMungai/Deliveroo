import React from 'react'
import AdminDash from '../components/Dashboards/AdminDash'
import AdminLayout from '../components/AdminLayout'

const AdminDashboard = () => {
  return (
    <div className='relative'>
        <AdminLayout>
          <AdminDash/>
        </AdminLayout>
    </div>
  )
}

export default AdminDashboard