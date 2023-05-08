import {
    GET_ALL_COUNTRIES, FILTER_PAG, GET_ALL_ACTIVITIES, GET_DETAILS, GET_BY_NAME,
    FILTER
} from "./actionType"

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    filteredCountries: [],
    activities: [],
    lettersId: [],
    detail: [],
    pag: 1,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                pag: 1,
                countries: action.payload,
                allCountries: action.payload,
                lettersId: action.payload
            }
        case FILTER_PAG:
            return {
                ...state,
                pag: action.payload
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
                activities: action.payload 
            }
        case GET_DETAILS:
            return {
                ...state,
                pag: 1,
                detail: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case FILTER:
            return {
                ...state,
                countries: action.payload,
                pag: 1
            }
        
        
        default:
            return { ...state };
    }
};

export default rootReducer;