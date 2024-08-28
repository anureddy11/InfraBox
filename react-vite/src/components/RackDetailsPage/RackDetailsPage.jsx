import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './RackDetailsPage.css';

const RackDetailsPage = () => {
    const { popName, rackId } = useParams();
    const racks = useSelector(state => state.pops.racks);

    // Safeguard to ensure racks data is available for the specified popName
    const popRacks = racks[popName] || [];
    const rack = popRacks.find(rack => rack.id === parseInt(rackId, 10));

    if (!rack) {
        return <div className="no-rack">No rack found with ID {rackId} for Pop {popName}.</div>;
    }

    // Fill in empty slots to match max_ru
    const rackSlots = [...rack.rack_slots];
    while (rackSlots.length < rack.max_ru) {
        rackSlots.push({ id: null, server: null });
    }

    return (
        <div className="rack-details-container">
            <h1>Rack Details</h1>
            <div className="rack-header">
                <h2>{rack.name}</h2>
                <p><strong>Max KW:</strong> {rack.max_kw}</p>
                <p><strong>Max RU:</strong> {rack.max_ru}</p>
            </div>
            <h3>Rack Slots</h3>
            <div className="rack-grid-container">
                <div className="rack-grid">
                    {rackSlots.map((slot, index) => (
                        <div key={index} className={slot.server ? 'rack-slot occupied' : 'rack-slot empty'}>
                            {slot.server ? slot.server : 'Empty'}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RackDetailsPage;

