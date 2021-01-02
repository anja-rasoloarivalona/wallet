import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    transactionForm: {
        isOpened: false,
        action: null,
        edited: null
    },
    budgetForm: {
        isOpened: false,
        action: null,
        edited: null
    },
    assetForm: {
        isOpened: false,
        action: null,
        edited: null
    },
    sidebar: {
        isShown: true
    },
    dashboard: {
        isManaging: false,
        action: null,
    },
    openedForm: null
}


const toggleForm = (state, action) => {
    const { data } = action
    if(!state[data.form] ){
        return state
    }

    if(state[data.form].isOpened){
        return updatedObject(state, {
            [data.form]: {
                isOpened: false,
                action: null,
                edited: null
            },
            openedForm: null
        })
    } else {
        return updatedObject(state, {
            [data.form]: {
                isOpened: true,
                action: data.edited ? "edit" : "add",
                edited: data.edited,
            },
            openedForm: data.form
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
        case actionTypes.TOGGLE_FORM: return toggleForm(state, action)
        case actionTypes.TOGGLE_SIDE_BAR: return toggleSidebar(state)
        case actionTypes.TOGGLE_DASHBOARD: return toggleDashboard(state, action)
        default: return state
    }
}

export default reducer