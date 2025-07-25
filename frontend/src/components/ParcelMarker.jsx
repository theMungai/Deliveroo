import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCoordinates } from "./Coordinates";
import Routing from "./Routing";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ParcelMarker() {
  const { pickupLocation, destinationLocation } = useCoordinates();

  return (
    <MapContainer
      center={pickupLocation}
      zoom={7}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Optional markers */}
      {pickupLocation && (
        <Marker position={pickupLocation}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}

      {destinationLocation && (
        <Marker position={destinationLocation}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      {/* Routing line */}
      {pickupLocation && destinationLocation && (
        <Routing from={pickupLocation} to={destinationLocation} />
      )}
    </MapContainer>
  );
}

export default ParcelMarker;
