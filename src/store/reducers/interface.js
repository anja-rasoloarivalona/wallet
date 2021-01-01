import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    transactionForm: {
        isOpened: false,
        action: null,
        editedTransaction: null
    },
    sidebar: {
        isShown: true
    },
    dashboard: {
        isManaging: false,
        action: null,
    }
}

const toggleTransactionForm = (state, action) => {
    const { data } = action
    if(data && data.action){
        return updatedObject(state, {
            transactionForm: {
                isOpened: true,
                action: data.action,
                editedTransaction: data.editedTransaction
            }
        })
    } else {
        return updatedObject(state, {
            transactionForm: {
                isOpened: false,
                action: null,
                editedTransaction: null
            }
        })
    }
}

const toggleSidebar = state => {
    const nextState = !state.sidebar.isShown
    return updatedObject(state, {
        sidebar: {
            isShown: nextState
        }
    })
}

const toggleDashboard = (state, action) => {
    if(action.action && action.action !== undefined){
        return updatedObject(state, {
            dashboard: {
                isManaging: true,
                action: action.action
            }
        })
    } else {
        return updatedObject(state, {
            dashboard: {
                isManaging: false,
                action: null,
            }
        })
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_TRANSACTION_FORM: return toggleTransactionForm(state, action)
        case actionTypes.TOGGLE_SIDE_BAR: return toggleSidebar(state)
        case actionTypes.TOGGLE_DASHBOARD: return toggleDashboard(state, action)
        default: return state
    }
}

export default reducer