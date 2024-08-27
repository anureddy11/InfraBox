import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./PopByCityPage.css";


function PopByCityPage() {
    const { city } = useParams(); // Extract the city code from the URL parameters
    const pops = useSelector(state => state.pops.pops); // Access pops from the Redux store

    // Get the pop data for the city
    const pop = pops[city];

    if (!pop) {
        return <div className="pop-by-city-container">Pop data not found for {city}</div>;
    }

    // Render the rack information in a table format
    return (
        <div className="pop-by-city-container">
            <h1>Welcome to {city}'s page</h1>
            <h2>Rack Information</h2>
            <table className="rack-table">
                <thead>
                    <tr>
                        <th>Rack ID</th>
                        <th>Rack Name</th>
                        <th>Max KW</th>
                        <th>Max RU</th>
                        <th>Number of Servers</th>
                        <th>Rack Utilizaiton </th>

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
                            <td colSpan="3">No racks available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PopByCityPage;
