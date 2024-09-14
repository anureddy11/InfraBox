import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import cities from './cityData'; // Ensure the path is correct
import './LandingPage.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetPops} from '../../redux/pops'; // Adjust the path as needed

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Function to find city coordinates
const getCityCoordinates = (cityName) => {
  const city = cities.find(c => c.city === cityName);
  return city ? { latitude: city.latitude, longitude: city.longitude } : { latitude: 0, longitude: 0 };
};

const LandingPage = () => {
    const dispatch = useDispatch();
    const pops = useSelector(state => state.pops.pops); // Pops is now an object
    const cities = useSelector(state => state.cities); // Assuming you have cities in your state

    useEffect(() => {
        dispatch(thunkGetPops(false));
    }, [dispatch]);

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
                        {Object.values(pops).map((pop) => {
                            const city  = pop.city;
                            const { latitude, longitude } = getCityCoordinates(city);
                            // console.log(latitude, longitude)
                            // Calculate the number of racks and total rack slots
                            const numberOfRacks = pop.racks ? pop.racks.length : 0;
                            const totalRackSlots = pop.racks
                                ? pop.racks.reduce((total, rack) => total + (rack.rack_slots ? rack.rack_slots.length : 0), 0)
                                : 0;
                            return (
                                <Marker
                                    key={pop.id}
                                    position={[latitude, longitude]}
                                >
                                    <Popup>
                                        <strong>
                                            <Link to={`/pop/${pop.name}`}>
                                                {pop.name}
                                            </Link>
                                        </strong><br />
                                        City: {city}<br />
                                        Racks: {numberOfRacks}<br />
                                        Servers: {totalRackSlots}
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
    );
};

export default LandingPage;
