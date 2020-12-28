import * as actionTypes from './actionTypes'

const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        user
    }
}

const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
    }
}

export {
    setUser,
    clearUser
}