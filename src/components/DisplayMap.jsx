import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DisplayMap = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    // Add marker
    L.marker([latitude, longitude])
      .addTo(mapInstanceRef.current)
      .bindPopup('This is the location.')
      .openPopup();

    // Ensure map adjusts on resize
    const resizeMap = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    // Resize map when the component first mounts
    resizeMap();

    // Resize map when the window resizes
    window.addEventListener('resize', resizeMap);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', resizeMap);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default DisplayMap;
