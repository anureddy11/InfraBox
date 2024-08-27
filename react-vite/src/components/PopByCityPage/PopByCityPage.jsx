import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UpdatePoPForm from "../UpdatePoPForm/UpdatePoPForm";
import "./PopByCityPage.css";


function PopByCityPage() {
    const { city } = useParams();
    const pops = useSelector(state => state.pops.pops);
    const pop = pops[city];

    const [isEditing, setIsEditing] = useState(false);

    if (!pop) {
        return <div className="pop-by-city-container">Pop data not found for {city}</div>;
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="pop-by-city-container">
            <h1>Welcome to {city}'s page</h1>
            <h2>Rack Information</h2>
            <button onClick={handleEditClick}>
                {isEditing ? "Cancel Update" : "Update Pop's Status"}
            </button>

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
                                <td>{rack.id}</td>
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
