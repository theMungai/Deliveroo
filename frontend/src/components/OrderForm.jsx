import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useCoordinates, COORDINATES } from "./Coordinates";

function OrderForm() {
  const { setDestinationLocation } = useCoordinates();

  const [weight, setWeight] = useState("");
  const [orderForm, setOrderForm] = useState({
    recipientName: "",
    pickupAddress: "Tatu City Ruiru, Kiambu County",
    destinationAddress: "",
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
      const coords = COORDINATES[value];
      if (coords) setDestinationLocation(coords);
    }

    setOrderForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const price = calculatePrice();
    if (price === null) {
      alert("Invalid weight. Must be between 0 and 25 kg.");
      return;
    }

    const payload = {
      recipient_name: orderForm.recipientName,
      pickup_address: orderForm.pickupAddress,
      destination_address: orderForm.destinationAddress,
      weight: parseFloat(weight),
      price: price,
    };

    fetch("https://your-backend-api.com/api/parcels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create parcel");
        return res.json();
      })
      .then((data) => {
        alert("Parcel order created successfully!", data);
      })
      .catch((error) => {
        alert("Something went wrong. Please try again.", error);
      });
  }

  return (
    <div className="rounded-[10px] bg-white border w-[55%] mx-auto my-5 px-10 py-6">
      <h1 className="font-bold text-[28px]">Create a New Parcel Order</h1>

      <form onSubmit={handleSubmit}>
        {/* Recipient Name */}
        <div className="mb-8">
          <label>
            Recipient Name
            <input
              className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded mt-2"
              type="text"
              name="recipientName"
              value={orderForm.recipientName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </label>
        </div>

        {/* Destination */}
        <div className="mb-8">
          <label>
            Destination Address
            <select
              className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded mt-2"
              name="destinationAddress"
              value={orderForm.destinationAddress}
              onChange={handleChange}
            >
              <option value="">Select Destination</option>
              {Object.keys(COORDINATES).map((loc, idx) =>
                loc !== "Tatu City Ruiru, Kiambu County" ? (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ) : null
              )}
            </select>
          </label>
        </div>

        {/* Weight */}
        <div className="mb-8">
          <label>
            Weight (kg)
            <input
              className="block w-full bg-[#F9F9FA] border px-2.5 py-3 rounded mt-2"
              type="number"
              placeholder="1"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>

        {/* Price Display */}
        <div className="border rounded p-4 mb-5">
          <h2 className="text-[#73C322] text-lg font-bold mb-2">Estimated Fee</h2>
          {calculatePrice() !== null ? (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faTruckFast} className="text-[#73C322]" />
              <span className="text-lg font-bold">KShs. {calculatePrice()}</span>
            </div>
          ) : (
            <p className="text-red-500 text-sm">
              Weight exceeds 25kg limit. Please adjust.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#73C322] text-white p-3 rounded w-full"
        >
          Create Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
