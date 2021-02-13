import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'
import { client, setDate } from '../../functions'

const initialState = {
    id: null,
    token: null,
    username: null,
    email: null,
    isLoggedIn: false,
    assets: null,
    transactions: null,
    budgets: null,
    appIsReady: false,
    current_period: setDate(new Date(), "mm-yyyy", "en"),
    goal: null
}

const setUser = (state, action) => {  
    const { transactions: _transactions } = action.user
    
    let transactions = []
    if(_transactions){
        _transactions.forEach(transaction => {
            transactions.push({
                ...transaction,
                period: setDate(transaction.date, "mm-yyyy", "en")
            })
        })
    } 
    

    return updatedObject(state, {
        ...action.user,
        transactions,
        isLoggedIn: true,
        appIsReady: true
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
        budgets: null,
        goal: null,
        transactions: null,
        appIsReady: true,
 
    })
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return setUser(state, action)
        case actionTypes.CLEAR_USER: return clearUser(state, action)
        case actionTypes.SET_ASSETS: return updatedObject(state, {assets: action.assets})
        case actionTypes.SET_BUDGETS: return updatedObject(state, {budgets: action.budgets})
        case actionTypes.SET_GOAL: return updatedObject(state, {goal: action.goal})
        case actionTypes.SET_TOKEN: return setToken(state, action)
        default: return state
    }
}

export default reducer