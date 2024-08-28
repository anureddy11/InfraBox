// Action Type
const GET_POPS = 'GET_POPS';
const CREATE_POP = 'CREATE_POP';
const UPDATE_POP = 'UPDATE_POP';
const DELETE_POP = 'DELETE_POP';

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

//Delete a Pop

export const thunkDeletePop = (name) => async(dispatch) =>{
    try {
        const response = await fetch(`/api/pop/${name}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete payment');
        }

        dispatch(deletePop(name));
    } catch (error) {
        console.error("Failed to delete pops:", error);
    }
}

// Thunk for Fetching Pops
export const thunkGetPops = () => async (dispatch) => {
    try {
        const response = await fetch('/api/pop/all');
        const data = await response.json();
        if (response.ok) {
            dispatch(getPops(data));
        }
        // No error dispatch; just handle successful response
        // console.log(data)
    } catch (error) {
        // Handle error here if needed
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
    racks: []
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
            return {
                ...state,
                pops: {
                     ...state.pops,
                    [action.payload.name]: action.payload
                }
            };


        default:
            return state;
    }
};

export default popsReducer;
