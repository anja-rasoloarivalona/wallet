import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'
import { client } from '../../functions'

const initialState = {
    id: null,
    token: null,
    username: null,
    email: null,
    isLoggedIn: false,
    assets: null
}

const setUser = (state, action) => {
    localStorage.setItem("moneytor-token", action.user.token)
    client.defaults.headers.common['Authorization'] = 'Bearer ' + action.user.token;
    return updatedObject(state, {
        ...action.user,
        isLoggedIn: true
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
        assets: null
    })
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return setUser(state, action)
        case actionTypes.CLEAR_USER: return clearUser(state, action)
        case actionTypes.SET_ASSETS: return updatedObject(state, {assets: action.assets})
        default: return state
    }
}

export default reducer