import React from 'react'
import UserDash from '../components/Dashboards/UserDash'
import Layout from '../components/Layout'

function Dashboard(){


  return (
    <div className='relative'>
      <Layout>
        <UserDash />
      </Layout>
    </div>
  )
}

export default Dashboard