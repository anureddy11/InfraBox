// Action Type
const GET_POPS = 'GET_POPS';
const CREATE_POP = 'CREATE_POP';
const UPDATE_POP = 'UPDATE_POP';
const DELETE_POP = 'DELETE_POP';
const GET_POP_BY_CITY = 'GET_POP_BY_CITY';

// Action Creator
const getPops = (popsData) => ({
    type: GET_POPS,
    payload: popsData,
});

const createPop = (popData) => ({
    type: CREATE_POP,
    payload: popData,
});

const updatePop = (popData) => ({
    type: UPDATE_POP,
    payload: popData,
});

const deletePop = (popName) => ({
    type: DELETE_POP,
    payload: popName,
});

// Action Creator for getting a single pop by city
const getPopByCity = (popData) => ({
    type: GET_POP_BY_CITY,
    payload: popData,
});
// Thunk for Fetching a Pop by City
export const thunkGetPopByCity = (name) => async (dispatch) => {
    try {
        const response = await fetch(`/api/pop/${name}`);
        const data = await response.json();
        if (response.ok) {
            dispatch(getPopByCity(data));
        } else {
            console.error("Failed to fetch pop:", data.error);
        }
    } catch (error) {
        console.error("Failed to fetch pop:", error);
    }
};

//Delete a Pop

export const thunkDeletePop = (name) => async(dispatch) =>{
    try {
        const response = await fetch(`/api/pop/${name}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete pio');
        }

        dispatch(deletePop(name));
    } catch (error) {
        console.error("Failed to delete pops:", error);
    }
}

// General Thunk for Fetching Pops
export const thunkGetPops = (includeRacks = true) => async (dispatch) => {
    try {
        // Include 'include_racks' query parameter based on the input
        const response = await fetch(`/api/pop/all?include_racks=${includeRacks}`);
        const data = await response.json();
        if (response.ok) {
            dispatch(getPops(data));  // Use the appropriate action to store the pops
        } else {
            console.error("Failed to fetch pops:", data.message);
        }
    } catch (error) {
        console.error("Failed to fetch pops:", error);
    }
};


// Thunk for Creating a New Pop
export const thunkCreatePop = (popData) => async (dispatch) => {
    console.log(popData)
    try {
        const response = await fetch('/api/pop/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(popData),
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(createPop(data));
        }
    } catch (error) {
        console.error("Failed to create pop:", error);
    }
};

//Update a PoP
export const thunkUpdatePop = (popName, popData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/pop/${popName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(popData),
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(updatePop(data));
        } else {
            console.error("Failed to update pop:", data.error);
        }
    } catch (error) {
        console.error("Failed to update pop:", error);
    }
};





const initialState = {
    pops: [],
    racks: [],
    currentRack: null,
    currentPop: null  // Add a field for the current pop
};

// Pops Reducer
const popsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POPS:
            const popsByCity = action.payload.reduce((acc, pop) => {
                acc[pop.name] = pop;
                return acc;
            }, {});

            const racksByPop = action.payload.reduce((acc, pop) => {
                acc[pop.name] = pop.racks
                return acc;
            }, {});

            return {
                ...state,
                pops:popsByCity,
                racks:racksByPop
            };

        case CREATE_POP:
            return {
                ...state,
                pops: {
                    ...state.pops,
                    [action.payload.city]: action.payload
                }
            };

        case UPDATE_POP:
            return {
                ...state,
                pops: {
                     ...state.pops,
                    [action.payload.name]: action.payload
                }
            };

        case DELETE_POP:
            const updatedPops = { ...state.pops };
            delete updatedPops[action.payload];
            return {
                ...state,
                pops: updatedPops
            };

        case GET_POP_BY_CITY:
            return {
                ...state,
                currentPop: action.payload
            };

        default:
            return state;
    }
};

export default popsReducer;
