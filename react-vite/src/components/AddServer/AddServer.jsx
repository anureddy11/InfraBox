import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './AddServer.css'; // Ensure this CSS file is correctly linked

const serverTypes = [
    { gen: 9, ru: 1, watts: 400, normalized_cpu: 1 },
    { gen: 10, ru: 1, watts: 400, normalized_cpu: 1.3 },
    { gen: 11, ru: 1, watts: 500, normalized_cpu: 2 },
    { gen: 12, ru: 2, watts: 600, normalized_cpu: 4 }
];

const AddServer = () => {
    const { popName, rackId, slotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [serverName, setServerName] = useState('');
    const [selectedServerType, setSelectedServerType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your action creator or thunk here to handle server addition
        // For example:
        // dispatch(thunkAddServer(popName, rackId, slotId, { serverName, selectedServerType }));

        // Example of redirecting after submission
        navigate(`/rack/${popName}/${rackId}`);
    };

    return (
        <div className="add-server-container">
            <h1>Add Server</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="server-type">Server Type:</label>
                    <select
                        id="server-type"
                        value={selectedServerType}
                        onChange={(e) => setSelectedServerType(e.target.value)}
                        required
                    >
                        <option value="">Select a server type</option>
                        {serverTypes.map((type, index) => (
                            <option key={index} value={type.gen}>
                                Generation {type.gen} - {type.ru} RU - {type.watts} Watts - {type.normalized_cpu} CPU
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Server</button>
            </form>
        </div>
    );
};

export default AddServer;
