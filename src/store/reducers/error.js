import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    error: null
}

const setError = (state, action) => {
    return updatedObject(state, {
        ...action.error
    })
}

const clearError = (state) => {
    return updatedObject(state, {
        error: null
    })
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_ERROR: return setError(state, action)
        case actionTypes.CLEAR_ERROR: return clearError
        default: return state;
    }
}

export default reducer