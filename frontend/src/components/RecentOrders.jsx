import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function RecentOrders() {
  const orders = [
    { id: 'SWP001', to: 'John Doe', status: 'In Transit', statusColor: 'bg-blue-100 text-blue-700', showArrow: true },
    { id: 'SWP002', to: 'Jane Smith', status: 'Delivered', statusColor: 'bg-green-100 text-green-700', showArrow: false },
    { id: 'SWP004', to: 'Emily White', status: 'Delayed', statusColor: 'bg-yellow-100 text-yellow-700', showArrow: false },
  ];

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
      <p className="text-gray-600 mb-6">Here are your last 3 shipments.</p>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">ID: {order.id}</p>
              {order.to && <p className="text-gray-600 text-sm">To: {order.to}</p>}
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
              {order.status}
              {order.showArrow && <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;