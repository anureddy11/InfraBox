import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { thunkAddRackSlot } from '../../redux/rack_slots'; // Adjust the path to where your thunks are located
import './AddServerModal.css'; // Custom styles for the modal

Modal.setAppElement('#root'); // For accessibility

const AddServerModal = ({ isOpen, onRequestClose, popName, rackId, slotId }) => {
    const [serverType, setServerType] = useState('');
    const dispatch = useDispatch();

    // List of server types
    const serverTypes = [
        'Server Gen 9',
        'Server Gen 10',
        'Server Gen 11' ,
        'Server Gen 12'
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        // Prepare server slot data
        const serverSlotData = {
            rack_id: rackId,
            slot_id: slotId,
            server: serverType
        };
        // Dispatch the thunk to add the server slot
        dispatch(thunkAddRackSlot(rackId, serverSlotData));
        // Close modal after submission
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
