import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './AllRacksPage.css';

const AllRacksPage = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const racks = useSelector(state => state.pops.racks);

    // Get all city names for the dropdown
    const cityNames = Object.keys(racks);

    // Handle dropdown change
    const handleDropdownChange = (event) => {
        setSelectedCity(event.target.value);
    };

    // Filter racks based on selected city
    const filteredRacks = selectedCity ? racks[selectedCity] || [] : [];

    return (
        <div className="all-racks-container">
            <div className="input-container">
                <label htmlFor="city-select">Select City:</label>
                <select
                    id="city-select"
                    value={selectedCity}
                    onChange={handleDropdownChange}
                >
                    <option value="">Select a city</option>
                    {cityNames.map(city => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            <div className="racks-wrapper">
                {filteredRacks.length > 0 ? (
                    filteredRacks.map(rack => (
                        <div key={rack.id} className="rack-container">
                            <h2>{rack.name}</h2>
                            <p><strong>Max RU:</strong> {rack.max_ru}</p>
                            <p><strong>Max KW:</strong> {rack.max_kw}</p>
                            <div className="rack-slots-table">
                                {Array.from({ length: rack.max_ru }, (_, index) => {
                                    // Find the slot based on its slot_id
                                    const slot = rack.rack_slots.find(slot => parseInt(slot.slot_id, 10) === index + 1);
                                    return (
                                        <div
                                            key={index}
                                            className={`rack-slot ${slot && slot.server ? 'occupied' : 'empty'}`}
                                        >
                                            {slot && slot.server ? `Slot ${slot.slot_id}: ${slot.server}` : `Slot ${index + 1}: Empty`}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No racks available for the selected city.</p>
                )}
            </div>
        </div>
    );
};

export default AllRacksPage;
