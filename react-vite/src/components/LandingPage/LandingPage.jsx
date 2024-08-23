import React from 'react';
import './LandingPage.css';
import cities from './cityData'; // Ensure this path is correct
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LandingPage = () => {
  return (
    <div className="landingpage-container">
      <div className="landingpage-header">
        <h1>Welcome to InfraBox!</h1>
        <h2>All your infra assets in one place</h2>
      </div>
      <div className="full-height-map">
        <MapContainer
          className="leaflet-container"
          center={[20, 0]} // Center of the map
          zoom={1} // Zoom level to show the whole world
          minZoom={2} // Set minimum zoom level
          maxZoom={19} // Set maximum zoom level
          maxBounds={[[-85.06, -180], [85.06, 180]]} // World boundaries
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <MarkerClusterGroup>
            {cities.map((city, index) => (
              <Marker
                key={index}
                position={[city.latitude, city.longitude]}
              >
                <Popup>
                  <strong>{city.city}</strong><br />
                  Latitude: {city.latitude}<br />
                  Longitude: {city.longitude}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default LandingPage;
