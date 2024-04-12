import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DisplayMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map
    mapRef.current = L.map('map-container').setView([latitude, longitude], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add marker
    L.marker([latitude, longitude])
      .addTo(mapRef.current)
      .bindPopup('This is the location.')
      .openPopup();

    // Cleanup when component unmounts
    return () => {
      mapRef.current.remove();
    };
  }, [latitude, longitude]);

  return <div id="map-container" style={{ height: '400px', width: '100%' }} />;
};

export default DisplayMap;
