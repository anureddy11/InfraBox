// Action Type
const GET_POPS = 'GET_POPS';
const CREATE_POP = 'CREATE_POP';

// Action Creator
const getPops = (popsData) => ({
    type: GET_POPS,
    payload: popsData,
});

const createPop = (popData) => ({
    type: CREATE_POP,
    payload: popData,
});

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


const initialState = {
    pops: []
};

// Pops Reducer
const popsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POPS:
            const popsByCity = action.payload.reduce((acc, pop) => {
                acc[pop.name] = pop;
                return acc;
            }, {});
            return {
                ...state,
                pops:popsByCity
            };

        case CREATE_POP:
            return {
                ...state,
                pops: {
                    ...state.pops,
                    [action.payload.city]: action.payload
                }
            };

        default:
            return state;
    }
};

export default popsReducer;
