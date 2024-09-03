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
    const filledSlotIds = rackSlots.map(slot => slot.slot_id);
    for (let i = 1; i <= rack.max_ru; i++) {
        if (!filledSlotIds.includes(i)) {
            rackSlots.push({ slot_id: i, server: null });
        }
    }

    // Sort slots by slot_id to ensure they are displayed in order
    rackSlots.sort((a, b) => a.slot_id - b.slot_id);

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
                            Slot {slot.slot_id}: {slot.server ? slot.server : 'Empty'}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RackDetailsPage;

