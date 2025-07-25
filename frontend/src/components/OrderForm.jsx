import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

function OrderForm() {
  const [weight, setWeight] = useState("");
  const ORIGIN_COORDS = [-1.127758, 36.939684];
  const DEST_COORDS = {
    "Nyeri": [-0.416665, 36.9499962],
    "Nakuru": [-0.303099, 36.080025],
    "Nairobi BuruBuru": [-1.2841, 36.8793],
    "Eldoret": [0.520360, 35.269779],
    "Kisumu": [-0.102206, 34.761711],
  };

  const [orderForm, setOrderForm] = useState({
    recipientName: "",
    pickupAddress: "Tatu City Ruiru, Kiambu County",
    pickupCoords: ORIGIN_COORDS,
    destinationAddress: "",
    destinationCoords: [],
  });

  const calculatePrice = () => {
    const weightValue = parseFloat(weight);

    if (!weight || isNaN(weightValue) || weightValue <= 0) return 0;

    if (weightValue > 25) return null;

    if (weightValue <= 5) return 300;
    else if (weightValue <= 15) return 500;
    else return 1000;
  };

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "destinationAddress") {
      setOrderForm((prev) => ({
        ...prev,
        destinationAddress: value,
        destinationCoords: DEST_COORDS[value] || [],
      }));
    } else {
      setOrderForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const price = calculatePrice();

    if (price === null) {
      alert("Invalid weight. Must be between 0 and 25 kg.");
      return;
    }

    // Get token and user id
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create an order.");
      return;
    }
    fetch("http://127.0.0.1:8000/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.id) {
          alert("Could not get user ID. Please log in again.");
          return;
        }
        const payload = {
          user_id: user.id,
          recipient_name: orderForm.recipientName,
          pickup_address: orderForm.pickupAddress,
          pickup_lat: orderForm.pickupCoords[0],
          pickup_lng: orderForm.pickupCoords[1],
          destination_address: orderForm.destinationAddress,
          destination_lat: orderForm.destinationCoords[0],
          destination_lng: orderForm.destinationCoords[1],
          weight: parseFloat(weight),
          price: price,
        };
        fetch("http://127.0.0.1:8000/parcels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to create parcel");
            return res.json();
          })
          .then((data) => {
            console.log("Order successfully submitted:", data);
            alert("Parcel order created successfully!");
          })
          .catch((error) => {
            console.error("Error submitting order:", error);
            alert("Something went wrong. Please try again.");
          });
      });
  }

  return (
    <div className="rounded-[10px] bg-white border-[0.5px] border-[#d4d4d4cb] w-[55%] mx-auto my-5 px-10 py-6">
      <h1 className="font-[600] text-[28px]">Create a New Parcel Order</h1>
      <p className="text-[15px] text-[#7a7a82] mb-8">
        Fill in the details below to create a new delivery.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Recipient Name */}
        <div className="mb-8">
          <label htmlFor="recipientName">
            Recipient Name
            <input
              className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded-[8px] mt-2"
              type="text"
              id="recipientName"
              name="recipientName"
              placeholder="John Doe"
              value={orderForm.recipientName}
              onChange={handleChange}
            />
            <p className="text-sm text-[#7a7a82]">
              The full name of the person receiving the parcel.
            </p>
          </label>
        </div>

        {/* Pickup and Destination */}
        <div className="flex gap-x-8 justify-between">
          {/* Pickup */}
          <div className="mb-8 basis-1/2">
            <label htmlFor="pickupAddress">
              Pickup Address
              <input
                className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded-[8px] mt-2"
                type="text"
                id="pickupAddress"
                name="pickupAddress"
                value={orderForm.pickupAddress}
                readOnly
              />
              <p className="text-sm text-[#7a7a82]">
                Where should we pick up the parcel from?
              </p>
            </label>
          </div>

          {/* Destination */}
          <div className="mb-8 basis-1/2">
            <label htmlFor="destinationAddress">
              Destination Address
              <select
                className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded-[8px] mt-2"
                id="destinationAddress"
                name="destinationAddress"
                value={orderForm.destinationAddress}
                onChange={handleChange}
              >
                <option value="">Select Destination</option>
                <option value="Nairobi BuruBuru">Nairobi BuruBuru</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Eldoret">Eldoret</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Nyeri">Nyeri</option>
              </select>
              <p className="text-sm text-[#7a7a82]">
                Where is the parcel going?
              </p>
            </label>
          </div>
        </div>

        {/* Weight */}
        <div className="mb-8">
          <label htmlFor="weight">
            Weight (kg)
            <input
              className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded-[8px] mt-2"
              type="number"
              id="weight"
              placeholder="1"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <p className="text-sm text-[#7a7a82]">
              The weight of the parcel in kilograms.
            </p>
          </label>
        </div>

        {/* Price */}
        <div className="w-full border rounded-[8px] p-[18px] mb-5">
          <h2 className="italic text-[#73C322] text-lg font-bold mb-4">
            Estimated Shipping Fee
          </h2>

          {calculatePrice() !== null ? (
            <div className="flex items-center gap-x-4">
              <FontAwesomeIcon icon={faTruckFast} className="text-[#73C322]" />
              <h2 className="italic text-lg font-bold">
                KShs. {calculatePrice()}
              </h2>
            </div>
          ) : (
            <p className="text-red-500 text-sm">
              Weight exceeds 25kg limit. Please adjust.
            </p>
          )}
        </div>

        <button className="bg-[#73C322] text-white p-3 rounded-[8px] cursor-pointer">
          Create Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
