// Action Type
const GET_POPS = 'GET_POPS';

// Action Creator
const getPops = (popsData) => ({
    type: GET_POPS,
    payload: popsData,
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


const initialState = {
    pops: []
};

// Pops Reducer
const popsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POPS:
            return {
                ...state,
                pops:action.payload
            };
        default:
            return state;
    }
};

export default popsReducer;
