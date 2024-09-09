import React, { useState } from 'react';
import Modal from 'react-modal';
import './UpdateServerModal.css';

Modal.setAppElement('#root');

const UpdateServerModal = ({ isOpen, onRequestClose, rackId, slotId, onUpdate }) => {
    const [serverType, setServerType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onUpdate(slotId, serverType);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Update Server Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Update Server</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="server-type">Server Type:</label>
                <select
                    id="server-type"
                    value={serverType}
                    onChange={(e) => setServerType(e.target.value)}
                >
                    <option value="">Select a server type</option>
                    <option value="Server Gen 9">Server Gen 9</option>
                    <option value="Server Gen 10">Server Gen 10</option>
                    <option value="Server Gen 11">Server Gen 11</option>
                    <option value="Server Gen 12">Server Gen 12</option>
                </select>
                <div className="modal-buttons">
                    <button type="submit">Update Server</button>
                    <button type="button" onClick={onRequestClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateServerModal;

