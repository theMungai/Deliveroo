import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

// =======================
// ✅ Routing Component
// =======================
const Routing = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to || !L.Routing) return;

    const control = L.Routing.control({
      waypoints: [L.latLng(...from), L.latLng(...to)],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "driving",
      }),
      lineOptions: {
        styles: [{ color: "#0084FF", weight: 5 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => map.removeControl(control);
  }, [map, from, to]);

  return null;
};

// =======================
// ✅ Label Icon Generator
// =======================
const labelIcon = (labelText, color = "bg-blue-600") =>
  L.divIcon({
    className: "",
    html: `
      <div class="px-3 py-1 rounded-lg text-white text-xs font-semibold shadow-md ${color}">
        ${labelText}
      </div>
    `,
    iconSize: [100, 30],
    iconAnchor: [50, 15],
  });

// =======================
// ✅ Bouncing Icon
// =======================
const bouncingIcon = L.divIcon({
  className: "",
  html: `
    <div class="animate-bounce w-5 h-5 bg-blue-500 rounded-full shadow-lg ring-2 ring-white"></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// =======================
// ✅ Main Map Component
// =======================
function ParcelMarker({ parcel }) {
  const parcelLocation =
    parcel?.pickup_lat !== undefined && parcel?.pickup_lng !== undefined
      ? [parcel.pickup_lat, parcel.pickup_lng]
      : [-1.127758, 36.939684];

  const destination =
    parcel?.destination_lat !== undefined && parcel?.destination_lng !== undefined
      ? [parcel.destination_lat, parcel.destination_lng]
      : [-0.102206, 34.761711];

  return (
    <MapContainer
      center={parcelLocation}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      className="z-0 rounded-xl"
    >
      {/* 🗺️ Map Tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 📍 Pickup Label & Animated Marker */}
      <Marker position={parcelLocation} icon={labelIcon("Pickup", "bg-emerald-600")} />
      <Marker position={parcelLocation} icon={bouncingIcon} />

      {/* 🎯 Destination Label & Animated Marker */}
      <Marker position={destination} icon={labelIcon("Destination", "bg-orange-600")} />
      <Marker position={destination} icon={bouncingIcon} />

      {/* 🚗 Route Line */}
      <Routing from={parcelLocation} to={destination} />
    </MapContainer>
  );
}

export default ParcelMarker;
