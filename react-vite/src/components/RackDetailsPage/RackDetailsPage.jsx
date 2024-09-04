import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddServerModal from '../AddServerModal/AddServerModal';
import './RackDetailsPage.css';
import { thunkGetRackSlots, thunkAddRackSlot } from '../../redux/rack_slots';

const RackDetailsPage = () => {
    const { popName, rackId } = useParams();
    const rackIdInt = parseInt(rackId, 10);
    const racks = useSelector(state => state.pops.racks);
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
            const rackSlots = [...rack.rack_slots];
            rackSlots.sort((a, b) => parseInt(a.slot_id) - parseInt(b.slot_id));

            const slots = [];
            for (let i = 1; i <= rack.max_ru; i++) {
                const slot = rackSlots.find(slot => parseInt(slot.slot_id) === i);
                if (slot) {
                    slots.push(slot);
                } else {
                    slots.push({ id: null, slot_id: i, server: null });
                }
            }
            setDisplaySlots(slots);
        }
    }, [rack]);

    const handleAddServerClick = (slotId) => {
        setSelectedSlotId(slotId);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (serverType) => {
        const slotData = {
            slot_id: selectedSlotId,
            server: serverType
        };
        // Dispatch thunk to add server slot
        await dispatch(thunkAddRackSlot(rackIdInt, slotData));

        // Fetch updated rack slots after adding a new server
        dispatch(thunkGetRackSlots(rackIdInt));

        // Update display slots with the new server
        setIsModalOpen(false);
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
                    {displaySlots.length > 0 ? (
                        displaySlots.map((slot, index) => (
                            <div key={index} className="rack-slot-container">
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
                        ))
                    ) : (
                        <div className="no-slots">No slots available</div>
                    )}
                </div>
            </div>
            <AddServerModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                popName={popName}
                rackId={rackIdInt}
                slotId={selectedSlotId}
                onSubmit={handleModalSubmit} // Pass this to handle submission
            />
        </div>
    );
};

export default RackDetailsPage;
