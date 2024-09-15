export const GET_RACKS = 'GET_RACKS';
export const ADD_RACK = 'ADD_RACK';
export const UPDATE_RACK = 'UPDATE_RACK';
export const DELETE_RACK = 'DELETE_RACK';


// Action Creator for getting racks
export const getRacks = (racksData) => ({
    type: GET_RACKS,
    payload: racksData,
});

// Action Creator for adding a rack
export const addRack = (rackData) => ({
    type: ADD_RACK,
    payload: rackData,
});

// Action Creator for updating a rack
export const updateRack = (rackData) => ({
    type: UPDATE_RACK,
    payload: rackData,
});

// Action Creator for deleting a rack
export const deleteRack = (rackId) => ({
    type: DELETE_RACK,
    payload: rackId,
});


// Thunk for fetching all racks for a given pop
export const thunkGetRacks = (popId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/racks/${popId}`);
        const data = await response.json();
        if (response.ok) {
            dispatch(getRacks(data));
        } else {
            console.error('Failed to fetch racks:', data);
        }
    } catch (error) {
        console.error('Error fetching racks:', error);
    }
};

// Thunk for adding a new rack
export const thunkAddRack = (rackData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/racks/add`, {  // Updated endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rackData),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(addRack(data));
        } else {
            console.error('Failed to add rack:', data);
        }
    } catch (error) {
        console.error('Error adding rack:', error);
    }
};

// Thunk for updating a rack
export const thunkUpdateRack = (popId, rackId, rackData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/racks/${popId}/rack/${rackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rackData),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(updateRack(data));
        } else {
            console.error('Failed to update rack:', data);
        }
    } catch (error) {
        console.error('Error updating rack:', error);
    }
};

// Thunk for deleting a rack
export const thunkDeleteRack = (popId, rackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/racks/${popId}/rack/${rackId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deleteRack(rackId));
        } else {
            const data = await response.json();
            console.error('Failed to delete rack:', data);
        }
    } catch (error) {
        console.error('Error deleting rack:', error);
    }
};

// Initial State
const initialState = {
    racks: [], // Can be { [popId]: [rackData] } if you want to store racks by pop
};

// Reducer
const racksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RACKS:
            return {
                ...state,
                racks: action.payload, // Optionally, map racks to popId
            };

        case ADD_RACK:
            return {
                ...state,
                racks: [
                    ...state.racks,
                    action.payload,
                ],
            };

        case UPDATE_RACK:
            return {
                ...state,
                racks: state.racks.map(rack =>
                    rack.id === action.payload.id
                        ? { ...rack, ...action.payload } // Update rack with new data
                        : rack
                ),
            };

        case DELETE_RACK:
            return {
                ...state,
                racks: state.racks.filter(rack =>
                    rack.id !== action.payload
                ),
            };

        default:
            return state;
    }
};

export default racksReducer;
