import React from 'react'
import OrderForm from '../components/OrderForm'
import Layout from '../components/Layout'

const NewOrder = () => {
  return (
    <div className='relative h-screen min-h-screen overflow-y-auto'>
        <Layout>
          <OrderForm />
        </Layout>
    </div>
  )
}

export default NewOrder