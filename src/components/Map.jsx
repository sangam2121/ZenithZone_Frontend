import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const Map = ({ onLocationSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize map when component mounts
    mapInstanceRef.current = L.map(mapContainerRef.current).setView([28.3949, 84.124], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    mapInstanceRef.current.on('click', handleMapClick);

    // Cleanup function
    return () => {
      mapInstanceRef.current.off('click', handleMapClick);
      mapInstanceRef.current.remove();
    };
  }, []);

  useEffect(() => {
    // Resize map when window is resized or dimensions change
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const confirmSelection = window.confirm(`Do you want to select this location?\nLatitude: ${lat}\nLongitude: ${lng}`);

    if (confirmSelection && onLocationSelect) {
      setSelectedLocation({ lat, lng });
      mapInstanceRef.current.setView([lat, lng], 14);

      onLocationSelect({ lat, lng })
    }
  };

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setSelectedLocation({ lat, lng: lon });
            mapInstanceRef.current.setView([lat, lon], 14);

            // Invoke the callback provided by the parent component with the searched location
            onLocationSelect({ lat, lng: lon });
          }
        })
        .catch(error => {
          console.error('Error searching location:', error);
        });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for a location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="button"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div ref={mapContainerRef} style={{ height: "400px", width: "700px" }} />
      {selectedLocation && (
        <p>
          Selected Location: Latitude {selectedLocation.lat}, Longitude {selectedLocation.lng}
        </p>
      )}
    </div>
  );
};

export default Map;
