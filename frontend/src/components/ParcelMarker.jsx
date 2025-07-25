// import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// import MarkerClusterGroup from "react-leaflet-cluster";
import MapPin from "../assets/LocationPin.png";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";

import L, { Icon} from "leaflet";
import "leaflet-routing-machine"; // must come AFTER importing 'L'


// ========================
// 1. Custom Marker Icon
// ========================
const customIcon = new Icon({
  iconUrl: MapPin,
  iconSize: [38, 38],
});


// ========================
// 3. Sample Markers for Testing
// ========================
const markers = [

];

// ========================
// 4. Routing Component
// ========================
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

// ========================
// 5. Main Component
// ========================
function ParcelMarker({ parcel }) {
  // Use coordinates from parcel prop if available
  const parcelLocation = (parcel?.pickup_lat !== undefined && parcel?.pickup_lng !== undefined)
    ? [parcel.pickup_lat, parcel.pickup_lng]
    : [-1.127758, 36.939684];
  const destination = (parcel?.destination_lat !== undefined && parcel?.destination_lng !== undefined)
    ? [parcel.destination_lat, parcel.destination_lng]
    : [-0.102206, 34.761711];

  return (
    <MapContainer
      center={parcelLocation}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Base Map Tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Route Line */}
      <Routing from={parcelLocation} to={destination} />

      {/* Markers for pickup and destination */}
      <Marker position={parcelLocation} icon={customIcon}>
        <Popup>Origin</Popup>
      </Marker>
      <Marker position={destination} icon={customIcon}>
        <Popup>Destination</Popup>
      </Marker>

      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          position={marker.geocode}
          icon={customIcon}
        >
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ParcelMarker;
