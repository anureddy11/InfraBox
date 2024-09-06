import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UpdateServerModal from '../UpdateServerModal/UpdateServerModal';
import { thunkGetRackSlots, thunkUpdateRackSlot, thunkDeleteRackSlot } from '../../redux/rack_slots';
import './RackDetailsPage.css';

const RackDetailsPage = () => {
    const { popName, rackId } = useParams();
    const rackIdInt = parseInt(rackId, 10);
    const racks = useSelector(state => state.pops.racks);
    const rackSlots = useSelector(state => state.current_rack.rackSlots);
    const dispatch = useDispatch();

    const popRacks = racks[popName] || [];
    const rack = popRacks.find(rack => rack.id === rackIdInt);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [displaySlots, setDisplaySlots] = useState([]);

    useEffect(() => {
        if (rackIdInt) {
            dispatch(thunkGetRackSlots(rackIdInt));
        }
    }, [dispatch, rackIdInt]);

    useEffect(() => {
        if (rack) {
            const slots = Array.from({ length: rack.max_ru }, (_, i) => {
                const slot = rackSlots.find(slot => parseInt(slot.slot_id) === i + 1);
                return slot ? slot : { id: null, slot_id: i + 1, server: null };
            });
            setDisplaySlots(slots);
        }
    }, [rack, rackSlots]);

    const handleUpdateServerClick = (slotId) => {
        setSelectedSlotId(slotId);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateServer = async (slotId, serverType) => {
        try {
            await dispatch(thunkUpdateRackSlot(rackIdInt, slotId, { server: serverType }));
        } catch (error) {
            console.error('Failed to update rack slot:', error);
        }
    };

    const handleDeleteServerClick = (slotId) => {
        dispatch(thunkDeleteRackSlot(rackIdInt, slotId));
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
                            {slot.server ? (
                                <>
                                    <button
                                        className="update-server-button"
                                        onClick={() => handleUpdateServerClick(slot.slot_id)}
                                    >
                                        Update Server
                                    </button>
                                    <button
                                        className="delete-server-button"
                                        onClick={() => handleDeleteServerClick(slot.slot_id)}
                                    >
                                        Delete Server
                                    </button>
                                </>
                            ) : (
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
            <UpdateServerModal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setIsUpdateModalOpen(false)}
                rackId={rackIdInt}
                slotId={selectedSlotId}
                onUpdate={handleUpdateServer}
            />
        </div>
    );
};

export default RackDetailsPage;
