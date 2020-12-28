import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    current_period: null,
    data: null
}

const addBudget = (state, action) => {
    const data = {
        ...state.data,
        [action.sub_id]: {
            master: action.master,
            color: action.color,
            sub_name: action.sub_name,
            sub_icon: action.sub_icon,
            amount: action.amount,
            used: 0
        }
    }
    return updatedObject(state, { data: data })
}

const setBudget = (state, action) => {
    const { budgets } = action
    return updatedObject(state, {
        data: budgets
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CURRENT_PERIOD: return updatedObject(state, { current_period: action.current_period})
        case actionTypes.ADD_BUDGET: return addBudget(state, action)
        case actionTypes.SET_BUDGET: return setBudget(state, action)
        default: return state
    }
}

export default reducer