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

// Thunk for fetching all rack slots for a given rack
export const thunkGetRackSlots = (rackId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/rack/${rackId}/slots`);
        console.log(response)
        const data = await response.json();
        if (response.ok) {
            dispatch(getRackSlots(data));
        } else {
            console.error('Failed to fetch rack slots:', data);
        }
    } catch (error) {
        console.error('Error fetching rack slots:', error);
    }
};


// Thunk for adding a new server
export const thunkAddRackSlot = (rackId, slotData) => async (dispatch) => {
    console.log(slotData)
    try {
        const response = await fetch(`/api/rack/${rackId}/slot/add`, {
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
    try {
        const response = await fetch(`/api/rack/${rackId}/slot/${slotId}`, {
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
        const response = await fetch(`/api/rack/${rackId}/slot/${slotId}`, {
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
    rackSlots: {}, // e.g., { [rackId]: [slotData] }
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
                rackSlots: {
                    ...state.rackSlots,
                    [action.payload.rackId]: state.rackSlots[action.payload.rackId].map(slot =>
                        slot.id === action.payload.id ? action.payload : slot
                    ),
                },
            };

            case DELETE_RACK_SLOT:
                // console.log(action.payload)
                console.log(state.rackSlots)
                return {
                    ...state,

                        // ...state.current_rack,
                        rackSlots: state.rackSlots.filter(slot =>
                            slot.slot_id !== action.payload
                        ),
                };

        default:
            return state;
    }
};

export default rackSlotsReducer;
