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

const setAssets = assets => {
    return {
        type: actionTypes.SET_ASSETS,
        assets
    }
}

const setToken = token => {
    return {
        type: actionTypes.SET_TOKEN,
        token
    }
}


export {
    setUser,
    clearUser,
    setAssets,
    setToken
}