// import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";
import MapPin from "../assets/LocationPin.png";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";

import L, { Icon, divIcon, point } from "leaflet";
import "leaflet-routing-machine"; // must come AFTER importing 'L'


// ========================
// 1. Custom Marker Icon
// ========================
const customIcon = new Icon({
  iconUrl: MapPin,
  iconSize: [38, 38],
});

// ========================
// 2. Custom Cluster Icon
// ========================
const createClusterCustomIcon = (cluster) =>
  new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });

// ========================
// 3. Sample Markers for Testing
// ========================
const markers = [
  {
    geocode: [1.29, 36.82],
    popUp: "Parcel Location",
  },
  {
    geocode: [1.3, 36.82],
    popUp: "Destination",
  },
  {
    geocode: [1.305, 36.825],
    popUp: "Other Delivery",
  },
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
function ParcelMarker() {
  const parcelLocation = [1.2921, 36.8219];  
  const destination = [0.0515, 37.6456];     

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

      {/* Marker Clusters */}
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            position={marker.geocode}
            icon={customIcon}
          >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

        {/* Hardcoded test markers */}
        <Marker key="hardcoded-1" position={[1.31, 36.815]} icon={customIcon}>
          <Popup>Backup Stop 1</Popup>
        </Marker>
        <Marker key="hardcoded-2" position={[1.298, 36.813]} icon={customIcon}>
          <Popup>Backup Stop 2</Popup>
        </Marker>
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default ParcelMarker;
