import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddServerModal from '../AddServerModal/AddServerModal';
import './RackDetailsPage.css';
import { thunkGetRackSlots } from '../../redux/rack_slots';

const RackDetailsPage = () => {
    const { popName, rackId } = useParams();
    const rackIdInt = parseInt(rackId, 10);
    const racks = useSelector(state => state.pops.racks);
    const rackSlots = useSelector(state => state.current_rack.rackSlots);
    const dispatch = useDispatch();

    const popRacks = racks[popName] || [];
    const rack = popRacks.find(rack => rack.id === rackIdInt);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [displaySlots, setDisplaySlots] = useState([]);

    // Fetch rack slots when component mounts
    useEffect(() => {
        if (rackIdInt) {
            dispatch(thunkGetRackSlots(rackIdInt));
        }
    }, [dispatch, rackIdInt]);

    // Update displaySlots when rack data changes
    useEffect(() => {
        if (rack) {
            const slots = Array.from({ length: rack.max_ru }, (_, i) => {
                const slot = rackSlots.find(slot => parseInt(slot.slot_id) === i + 1);
                return slot ? slot : { id: null, slot_id: i + 1, server: null };
            });
            setDisplaySlots(slots);
        }
    }, [rack, rackSlots]);

    const handleAddServerClick = (slotId) => {
        setSelectedSlotId(slotId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedSlotId(null); // Reset the selected slot when the modal is closed
    };

    if (!rack) {
        return <div className="no-rack">No rack found with ID {rackId} for Pop {popName}.</div>;
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
                    {displaySlots.map((slot) => (
                        <div key={slot.slot_id} className="rack-slot-container">
                            <div className={slot.server ? 'rack-slot occupied' : 'rack-slot empty'}>
                                {slot.server ? `Slot ${slot.slot_id}: ${slot.server}` : `Slot ${slot.slot_id}: Empty`}
                            </div>
                            {!slot.server && (
                                <button
                                    className="add-server-button"
                                    onClick={() => handleAddServerClick(slot.slot_id)}
                                >
                                    Add Server
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <AddServerModal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                popName={popName}
                rackId={rackIdInt}
                slotId={selectedSlotId}
            />
        </div>
    );
};

export default RackDetailsPage;

