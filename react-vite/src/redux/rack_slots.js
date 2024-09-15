export const GET_RACK_SLOTS = 'GET_RACK_SLOTS';
export const ADD_RACK_SLOT = 'ADD_RACK_SLOT';
export const UPDATE_RACK_SLOT = 'UPDATE_RACK_SLOT';
export const DELETE_RACK_SLOT = 'DELETE_RACK_SLOT';


// Action Creator for getting rack slots
export const getRackSlots = (rackSlotsData) => ({
    type: GET_RACK_SLOTS,
    payload: rackSlotsData,
});

// Action Creator for adding a rack slot
export const addRackSlot = (rackSlotData) => ({
    type: ADD_RACK_SLOT,
    payload: rackSlotData,
});

// Action Creator for updating a rack slot
export const updateRackSlot = (rackSlotData) => ({
    type: UPDATE_RACK_SLOT,
    payload: rackSlotData,
});

// Action Creator for deleting a rack slot
export const deleteRackSlot = (rackSlotId) => ({
    type: DELETE_RACK_SLOT,
    payload: rackSlotId,
});

export const thunkGetRackSlots = (rackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/rack-slots/${rackId}/slots`);
        const data = await response.json();

        if (response.ok) {
            // Check if data is an empty array
            if (Array.isArray(data)) {
                // Dispatch the data (empty array if no slots are found)
                dispatch(getRackSlots(data));
            } else {
                console.error('Unexpected data format:', data);
                // Optionally, handle unexpected data format
            }
        } else {
            console.error('Failed to fetch rack slots:', data);
            // Optionally, handle errors
        }
    } catch (error) {
        console.error('Error fetching rack slots:', error);
        // Optionally, handle errors
    }
};


// Thunk for adding a new server
export const thunkAddRackSlot = (rackId, slotData) => async (dispatch) => {
    // console.log(slotData)
    console.log(rackId)
    try {
        const response = await fetch(`/api/rack-slots/${rackId}/slot/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slotData),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(addRackSlot(data));
        } else {
            console.error('Failed to add rack slot:', data);
        }
    } catch (error) {
        console.error('Error adding rack slot:', error);
    }
};

//Update rack slot
export const thunkUpdateRackSlot = (rackId, slotId, slotData) => async (dispatch) => {
    // console.log(rackId,)
    try {
        const response = await fetch(`/api/rack-slots/${rackId}/slot/${slotId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slotData),
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(updateRackSlot(data));
        } else {
            console.error('Failed to update rack slot:', data);
        }
    } catch (error) {
        console.error('Error updating rack slot:', error);
    }
};


//Delete server
export const thunkDeleteRackSlot = (rackId, slotId) => async (dispatch) => {
    console.log(rackId,slotId)
    try {
        const response = await fetch(`/api/rack-slots/${rackId}/slot/${slotId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(deleteRackSlot(slotId));
        } else {
            const data = await response.json();
            console.error('Failed to delete rack slot:', data);
        }
    } catch (error) {
        console.error('Error deleting rack slot:', error);
    }
};


// Initial State
const initialState = {
    rackSlots: [], // e.g., { [rackId]: [slotData] }
};

// Reducer
const rackSlotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RACK_SLOTS:
            return {
                ...state,
                rackSlots: action.payload,
            };

        case ADD_RACK_SLOT:
            return {
                ...state,
                rackSlots: [
                    ...state.rackSlots,
                    action.payload,
                ],
            };

            case UPDATE_RACK_SLOT:
                return {
                    ...state,
                    rackSlots: state.rackSlots.map(slot =>
                        slot.slot_id === action.payload.slot_id && slot.created_at === action.payload.created_at
                            ? { ...slot, ...action.payload } // Update slot with new data
                            : slot
                    ),
                };

            case DELETE_RACK_SLOT:
                return {
                    ...state,
                    rackSlots: state.rackSlots.filter(slot =>
                        slot.slot_id !== action.payload
                    ),
                };

        default:
            return state;
    }
};

export default rackSlotsReducer;
