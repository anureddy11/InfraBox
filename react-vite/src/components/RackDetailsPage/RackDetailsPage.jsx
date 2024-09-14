import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddServerModal from '../AddServerModal/AddServerModal';
import UpdateServerModal from '../UpdateServerModal/UpdateServerModal';
import { thunkUpdateRackSlot, thunkDeleteRackSlot, thunkAddRackSlot, thunkGetRackSlots } from '../../redux/rack_slots';
import { thunkGetPopByCity } from '../../redux/pops';
import './RackDetailsPage.css';

const RackDetailsPage = () => {
    const { popName, rackId } = useParams();
    const rackIdInt = parseInt(rackId, 10);

    const dispatch = useDispatch();
    const currentPop = useSelector(state => state.pops.currentPop);
    const rackSlots = useSelector(state => state.current_rack.rackSlots || []);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    useEffect(() => {
        if (!currentPop || currentPop.name !== popName) {
            dispatch(thunkGetPopByCity(popName));
        }
    }, [dispatch, popName, currentPop]);

    useEffect(() => {
        dispatch(thunkGetRackSlots(rackIdInt));
    }, [dispatch, rackIdInt,rackSlots]);

    // Create a full list of rack slots, initializing empty slots where needed
    const generateFullRackSlots = () => {
        if (!currentPop) return [];

        const rack = currentPop.racks.find(rack => rack.id === rackIdInt);
        if (!rack) return [];

        // Initialize all slots as empty
        const fullRackSlots = Array.from({ length: rack.max_ru }, (_, i) => {
            const slot = rackSlots.find(slot => parseInt(slot.slot_id) === i + 1);
            return slot || { id: null, slot_id: i + 1, server: null }; // Ensure each slot is represented
        });

        return fullRackSlots;
    };

    const displaySlots = generateFullRackSlots();

    const handleAddServerClick = (slotId) => {
        setSelectedSlotId(slotId);
        setIsAddModalOpen(true);
    };

    const handleAddModalSubmit = async (serverType) => {
        const slotData = {
            slot_id: selectedSlotId,
            server: serverType
        };
        await dispatch(thunkAddRackSlot(rackIdInt, slotData));
        setIsAddModalOpen(false);
    };

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
        setSelectedSlotId(null);
    };

    const handleUpdateServerClick = (slotId) => {
        setSelectedSlotId(slotId);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateServer = async (slotId, serverType) => {
        try {
            await dispatch(thunkUpdateRackSlot(rackIdInt, slotId, { server: serverType }));
            setIsUpdateModalOpen(false);
        } catch (error) {
            console.error('Failed to update rack slot:', error);
        }
    };

    const handleDeleteServerClick = (slotId) => {
        dispatch(thunkDeleteRackSlot(rackIdInt, slotId));
    };

    if (!currentPop || !currentPop.racks.find(rack => rack.id === rackIdInt)) {
        return <div className="no-rack">No rack found with ID {rackId} for Pop {popName}.</div>;
    }

    const rack = currentPop.racks.find(rack => rack.id === rackIdInt);

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
            <AddServerModal
                isOpen={isAddModalOpen}
                onRequestClose={handleAddModalClose}
                onSubmit={handleAddModalSubmit}
                popName={popName}
                rackId={rackIdInt}
                slotId={selectedSlotId}
            />

            <UpdateServerModal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setIsUpdateModalOpen(false)}
                slotId={selectedSlotId}
                rackId={rackIdInt}
                onUpdate={handleUpdateServer}
            />
        </div>
    );
};

export default RackDetailsPage;
