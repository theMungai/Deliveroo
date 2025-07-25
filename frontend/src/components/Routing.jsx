import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

function Routing({ from, to }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to) return;

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

    return () => {
      map.removeControl(control);
    };
  }, [map, from, to]);

  return null;
}

export default Routing;
