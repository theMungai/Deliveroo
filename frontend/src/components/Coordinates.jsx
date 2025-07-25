import { createContext, useContext, useState } from "react";

// Coordinates dictionary
export const COORDINATES= {
  "Nyeri": [-0.416665, 36.9499962],
  "Nakuru": [-0.303099, 36.080025],
  "Nairobi BuruBuru": [-1.2841, 36.8793],
  "Eldoret": [0.52036, 35.269779],
  "Kisumu": [-0.102206, 34.761711],
  "Tatu City Ruiru, Kiambu County": [-1.127758, 36.939684],
};

const CoordinatesContext = createContext();

export function CoordinatesProvider({ children }) {
  const [pickupLocation, setPickupLocation] = useState(
    COORDINATES["Tatu City Ruiru, Kiambu County"]
  );
  const [destinationLocation, setDestinationLocation] = useState(null); 

  return (
    <CoordinatesContext.Provider
      value={{
        pickupLocation,
        destinationLocation,
        setPickupLocation,
        setDestinationLocation,
      }}
    >
      {children}
    </CoordinatesContext.Provider>
  );
}

export function useCoordinates() {
  return useContext(CoordinatesContext);
}


