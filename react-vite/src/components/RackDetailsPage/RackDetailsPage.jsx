import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './RackDetailsPage.css';

const RackDetailsPage = () => {
    const { popName, rackId } = useParams();
    const navigate = useNavigate();
    const racks = useSelector(state => state.pops.racks);

    // Safeguard to ensure racks data is available for the specified popName
    const popRacks = racks[popName] || [];
    const rack = popRacks.find(rack => rack.id === parseInt(rackId, 10));

    if (!rack) {
        return <div className="no-rack">No rack found with ID {rackId} for Pop {popName}.</div>;
    }

    // Extract existing slots and sort them by slot_id
    const rackSlots = [...rack.rack_slots];
    rackSlots.sort((a, b) => parseInt(a.slot_id) - parseInt(b.slot_id));

    // Create an array for display, filling in empty slots
    const displaySlots = [];
    for (let i = 1; i <= rack.max_ru; i++) {
        const slot = rackSlots.find(slot => parseInt(slot.slot_id) === i);
        if (slot) {
            displaySlots.push(slot);
        } else {
            displaySlots.push({ id: null, slot_id: i, server: null });
        }
    }

    // Function to navigate to the add server form
    const handleAddServerClick = (slotId) => {
        navigate(`/rack/${popName}/${rackId}/${slotId}`);
    };

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
                    {displaySlots.length > 0 ? (
                        displaySlots.map((slot, index) => (
                            <div key={index} className={slot.server ? 'rack-slot occupied' : 'rack-slot empty'}>
                                {slot.server ?
                                    `Slot ${slot.slot_id}: ${slot.server}` :
                                    <div>
                                        Slot {slot.slot_id}: Empty
                                        <button
                                            className="add-server-button"
                                            onClick={() => handleAddServerClick(slot.slot_id)}
                                        >
                                            Add Server
                                        </button>
                                    </div>
                                }
                            </div>
                        ))
                    ) : (
                        <div className="no-slots">No slots available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RackDetailsPage;
