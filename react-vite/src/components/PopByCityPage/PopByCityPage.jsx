import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import UpdatePoPForm from "../UpdatePoPForm/UpdatePoPForm";
import { thunkDeletePop, thunkGetPopByCity } from "../../redux/pops";
import { thunkAddRack, thunkDeleteRack } from "../../redux/racks"; // Import the rack thunks
import "./PopByCityPage.css";

function PopByCityPage() {
    const { city } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pop = useSelector(state => state.pops.currentPop);
    const current_rack = useSelector(state => state.current_rack.racks); // Access the currentPop state

    const [isEditing, setIsEditing] = useState(false);
    const [isCreatingRack, setIsCreatingRack] = useState(false); // State for creating rack
    const [rackFormData, setRackFormData] = useState({ name: '', max_kw: '', max_ru: '' });

    useEffect(() => {
        // Dispatch the thunk action to fetch the pop by city
        dispatch(thunkGetPopByCity(city));
    }, [city, dispatch, current_rack]);

    if (!pop) {
        return <div className="pop-by-city-container">Pop data not found for {city}</div>;
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete the Pop in ${city}?`)) {
            dispatch(thunkDeletePop(pop.name));
            navigate('/'); // Redirect to home or any other page after deletion
        }
    };

    const handleRackFormChange = (e) => {
        setRackFormData({
            ...rackFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddRackClick = () => {
        setIsCreatingRack(!isCreatingRack);
    };

    const handleCreateRackSubmit = (e) => {
        e.preventDefault();

        // Prepare rack data and convert string fields to appropriate types
        const rackData = {
            ...rackFormData,
            max_kw: parseFloat(rackFormData.max_kw),
            max_ru: parseInt(rackFormData.max_ru),
            pop_id: pop.id // Ensure the pop_id is included in the data
        };

        console.log(rackData);

        // Dispatch the corrected thunk without passing pop.id directly
        dispatch(thunkAddRack(rackData)).then(() => {
            // Re-fetch pop details after adding a rack
            dispatch(thunkGetPopByCity(city));
        });

        // Reset form state and toggle the creation mode
        setIsCreatingRack(false);
        setRackFormData({ name: '', max_kw: '', max_ru: '' });
    };

    const handleDeleteRack = (rackId) => {
        if (window.confirm("Are you sure you want to delete this rack?")) {
            dispatch(thunkDeleteRack(pop.id, rackId));
        }
    };

    // Determine status class based on pop.status
    const statusClass = pop.status === 'active' ? 'status-active' : 'status-out-of-production';

    return (
        <div className="pop-by-city-container">
            <h1>Welcome to {city}'s page</h1>
            <h2>Pop Status: <span className={statusClass}>{pop.status}</span></h2> {/* Display status */}
            <h2>Rack Information</h2>

            <div className="button-container">
                <button className="edit-button" onClick={handleEditClick}>
                    {isEditing ? "Cancel Update" : "Update Pop's Status"}
                </button>
                <button className="delete-button" onClick={handleDeleteClick}>
                    Delete Pop
                </button>
                <button className="create-rack-button" onClick={handleAddRackClick}>
                    {isCreatingRack ? "Cancel Create Rack" : "Create New Rack"}
                </button>
            </div>

            {isEditing && <UpdatePoPForm pop={pop} />}

            {isCreatingRack && (
                <form className="rack-form" onSubmit={handleCreateRackSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={rackFormData.name}
                        onChange={handleRackFormChange}
                        placeholder="Rack Name"
                        required
                    />
                    <input
                        type="number"
                        name="max_kw"
                        value={rackFormData.max_kw}
                        onChange={handleRackFormChange}
                        placeholder="Max KW"
                        required
                    />
                    <input
                        type="number"
                        name="max_ru"
                        value={rackFormData.max_ru}
                        onChange={handleRackFormChange}
                        placeholder="Max RU"
                        required
                    />
                    <button type="submit">Create Rack</button>
                </form>
            )}

            <table className="rack-table">
                <thead>
                    <tr>
                        <th>Rack ID</th>
                        <th>Rack Name</th>
                        <th>Max KW</th>
                        <th>Max RU</th>
                        <th>Number of Servers</th>
                        <th>Rack Utilization</th>
                        <th>Actions</th> {/* Add column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {pop.racks && pop.racks.length > 0 ? (
                        pop.racks.map(rack => (
                            <tr key={rack.id}>
                                <td>
                                    <NavLink to={`/rack/${pop.name}/${rack.id}`}>
                                        {rack.id}
                                    </NavLink>
                                </td>
                                <td>{rack.name}</td>
                                <td>{rack.max_kw}</td>
                                <td>{rack.max_ru}</td>
                                <td>{rack.rack_slots ? rack.rack_slots.length : 0}</td>
                                <td>
                                    {rack.rack_slots
                                        ? (rack.rack_slots.length / rack.max_ru).toFixed(2)
                                        : '0.00'}
                                </td>
                                <td>
                                    <button className="delete-rack-button" onClick={() => handleDeleteRack(rack.id)}>
                                        Delete Rack
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No racks available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PopByCityPage;
