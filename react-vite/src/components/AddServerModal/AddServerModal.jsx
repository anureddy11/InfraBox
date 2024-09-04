import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { thunkAddRackSlot, thunkGetRackSlots } from '../../redux/rack_slots';
import './AddServerModal.css';

Modal.setAppElement('#root');

const AddServerModal = ({ isOpen, onRequestClose, rackId, slotId }) => {
    const [serverType, setServerType] = useState('');
    const dispatch = useDispatch();

    const serverTypes = [
        'Server Gen 9',
        'Server Gen 10',
        'Server Gen 11',
        'Server Gen 12'
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const serverSlotData = {
            rack_id: rackId,
            slot_id: slotId,
            server: serverType
        };
        await dispatch(thunkAddRackSlot(rackId, serverSlotData));
        await dispatch(thunkGetRackSlots(rackId)); // Refresh the rack slots after adding
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Server Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Add Server</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="server-type">Server Type:</label>
                <select
                    id="server-type"
                    value={serverType}
                    onChange={(e) => setServerType(e.target.value)}
                >
                    <option value="">Select a server type</option>
                    {serverTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <div className="modal-buttons">
                    <button type="submit">Add Server</button>
                    <button type="button" onClick={onRequestClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddServerModal;
