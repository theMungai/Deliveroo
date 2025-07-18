import React from 'react'
import {Edit} from 'react-feather'
import { parcels } from './Parcels'

function AdminDash(){

  function checkStatus(status) {
    if (status === "In Transit") {
      return "bg-[#DBEAFE] text-[#344BB3]";
    }
    else if(status === "Delivered"){
      return "bg-[#DCFCE7] text-[#166534]"
    }
    else if(status === "Delayed"){
      return "bg-[#FFEDD5] text-[#A66737]"
    }
    else if(status === "Canceled"){
      return "bg-[#FFC5C5] text-[#FF0000]"
    }
    else if(status === "Pending"){
      return "bg-[#FFF8C5] text-[#574D00]"
    }
  }

  

  return (
    <div className='w-[90%] mx-auto my-12'>
      <h1 className='text-[22px] font-[700]'>Admin Panel</h1>
      <p className='mb-6 text-[16px] text-[400]'>Manage all parcel deliveries</p>

      <div className='bg-white shadow-xl rounded-[8px] p-4'>
        <h2 className='font-[600] text-[18px]'>All Parcels</h2>
        <p className='text-[16px] font-[400] mb-4'>Manage all parcel deliveries</p>

        <table className="min-w-full rounded-[8px] table-auto border-[0.5px] border-[#E5E5E5]">
          <thead>
            <tr className="border-b-[0.5px] border-[#E5E5E5]">
              <th className="py-2 px-4 text-left text-[#969393]">Parcel ID</th>
              <th className="py-2 px-4 text-left text-[#969393]">Status</th>
              <th className="py-2 px-4 text-left text-[#969393]">Recipient</th>
              <th className="py-2 px-4 text-left text-[#969393]">Destination</th>
              <th className="py-2 px-4 text-left text-[#969393]">Weight (kg)</th>
              <th className="py-2 px-4 text-left text-[#969393]">Delivery Date</th>
              <th className="py-2 px-4 text-left text-[#969393]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel.id} className="border-b-[0.5px] border-[#E5E5E5]">
                <td className="py-2 px-4">{parcel.id}</td>
                <td>
                  <span className={`py-1 px-2.5 rounded-[14px] cursor-pointer ${checkStatus(parcel.status)}`}>{parcel.status}</span>
                </td>
                <td className="py-2 px-4">{parcel.recipient}</td>
                <td className="py-2 px-4">{parcel.destination}</td>
                <td className="py-2 px-4">{parcel.weight}</td>
                <td className="py-2 px-4">{parcel.deliveryDate}</td>
                <td className="py-2 px-4">
                  <button className="cursor-pointer rounded-[10px] bg-[#E4E4E4] text-black text-[14px] py-1 px-4 flex items-center">
                    <Edit className="mr-2 text-xs" size="14px" /> Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDash