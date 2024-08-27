import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdatePop } from "../../redux/pops";

function UpdatePopForm({ pop }) {
    const [status, setStatus] = useState(pop.status);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(thunkUpdatePop(pop.name, { status })); // Update only the status
    };

    return (
        <form onSubmit={handleSubmit} className="update-pop-form">
            <div>
                <label>Status:</label>
                <select
                    name="status"
                    value={status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="outof production">Out of Production</option>
                </select>
            </div>
            <button type="submit">Update Pop</button>
        </form>
    );
}

export default UpdatePopForm;
