import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    current_period: null,
    data: []
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
        case actionTypes.SET_BUDGET: return setBudget(state, action)
        default: return state
    }
}

export default reducer