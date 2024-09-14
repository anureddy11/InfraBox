import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import UpdatePoPForm from "../UpdatePoPForm/UpdatePoPForm";
import { thunkDeletePop, thunkGetPops,thunkGetPopByCity } from "../../redux/pops"; // Import the delete thunk
import "./PopByCityPage.css";

function PopByCityPage() {
    const { city } = useParams();
    // const pops = useSelector(state => state.pops.pops);
    // const pop = pops[city];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pop = useSelector(state => state.pops.currentPop); // Access the currentPop state
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Dispatch the thunk action to fetch the pop by city
        dispatch(thunkGetPopByCity(city));
    }, [city, dispatch]);

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
            </div>

            {isEditing && <UpdatePoPForm pop={pop} />}

            <table className="rack-table">
                <thead>
                    <tr>
                        <th>Rack ID</th>
                        <th>Rack Name</th>
                        <th>Max KW</th>
                        <th>Max RU</th>
                        <th>Number of Servers</th>
                        <th>Rack Utilization</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No racks available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PopByCityPage;
