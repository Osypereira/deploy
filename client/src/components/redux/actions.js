import { GET_ALL_COUNTRIES, FILTER_PAG, GET_ALL_ACTIVITIES, GET_DETAILS, GET_BY_NAME, FILTER } from "./actionType"
import axios from "axios";


export function getAllCountries() {
    return async (dispatch) => {
        try {
            const results = await axios.get("http://localhost:3001/country")
            dispatch({ type: GET_ALL_COUNTRIES, payload: results.data})
        } catch (error) {
            console.log("error", error.message);
        }
    }
}
export const pagNum = (number) => {
    return async (dispatch) => {
        dispatch({
            type: FILTER_PAG,
            payload: number
        })
    }
}
export function getAllActivities() {
    return async(dispatch) => {
        try {
            const result = await axios.get("http://localhost:3001/activity")
            dispatch({ type: GET_ALL_ACTIVITIES, payload: result.data})
        } catch (error) {
            console.log("error", error.message)
        }
    }
}
export const getDetail = (id) => {
  
    return async (dispatch) => {
        
        try {
            const json = await axios.get(`http://localhost:3001/country/${id}`);
           
            
            dispatch({
                type: GET_DETAILS,
                payload: json.data
           });
        } catch (error) {
            console.log("Error, Not ID", error);
        }
    }
}
export  function getByName (name)  {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/country?name=${name}`)
            console.log(res.data);
            dispatch({
                type: GET_BY_NAME,
                payload: res.data
            })
        } catch (error) {
            console.log("Error, Not NAME", error);
        }
    }
}
export function postActivities(activity) {
    return async () => {
        try {
            console.log(activity)
            await axios.post("http://localhost:3001/activity", activity)
            return
       } catch (error) {
           console.log(error);
       } 
    }
}
export function filterCountry(country) {
    return  (dispatch) => {
        try {
            console.log(country)
            return dispatch({
                 type: FILTER, payload: country
             }) 
        } catch (error) {
        }
    }
}

