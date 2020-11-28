import * as actionTypes from '../actions/actionTypes'

const setError = error => {
    return {
        type: actionTypes.SET_ERROR,
        error
    }
}

const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    }
}

export {
    setError,
    clearError
}