import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function RecentOrders() {
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    // Fetch user profile to get user_id
    fetch('http://127.0.0.1:8000/users/profile')
      .then(res => res.json())
      .then(user => {
        fetch(`http://127.0.0.1:8000/parcels/user/${user.id}`)
          .then(res => res.json())
          .then(parcels => {
            // Sort parcels by updated_at descending (latest first) and take the first 3
            const latestThree = [...parcels]
              .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
              .slice(0, 3);
            setOrders(latestThree);
          });
      });
  }, []);

  const getStatusColor = (status) => {
    if (status === 'In Transit') return 'bg-blue-100 text-blue-700';
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    if (status === 'Delayed') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Canceled') return 'bg-red-100 text-red-700';
    if (status === 'Pending') return 'bg-yellow-50 text-yellow-800';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
      <p className="text-gray-600 mb-6">Here are your last 3 shipments.</p>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">ID: SWP{order.id}</p>
              {order.recipient_name && <p className="text-gray-600 text-sm">To: {order.recipient_name}</p>}
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
              {order.status}
              {order.status === 'In Transit' && <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;