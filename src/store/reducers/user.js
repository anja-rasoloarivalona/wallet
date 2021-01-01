import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'
import { client } from '../../functions'

const initialState = {
    id: null,
    token: null,
    username: null,
    email: null,
    isLoggedIn: false,
    assets: null,
    transactions: null
}

const setUser = (state, action) => {   
    return updatedObject(state, {
        ...action.user,
        isLoggedIn: true
    })
}

const setToken = (state, action) => {
    localStorage.setItem("moneytor-token", action.token)
    client.defaults.headers.common['Authorization'] = 'Bearer ' + action.token;
    return updatedObject(state, {
        token: action.token
    })
}

const clearUser = state => {
    localStorage.removeItem("moneytor-token")
    client.defaults.headers.common['Authorization'] = 'Bearer ';
    return updatedObject(state, {
        id: null,
        token: null,
        username: null,
        email: null,
        isLoggedIn: false,
        assets: null,
        transactions: null
    })
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return setUser(state, action)
        case actionTypes.CLEAR_USER: return clearUser(state, action)
        case actionTypes.SET_ASSETS: return updatedObject(state, {assets: action.assets})
        case actionTypes.SET_TOKEN: return setToken(state, action)
        default: return state
    }
}

export default reducer