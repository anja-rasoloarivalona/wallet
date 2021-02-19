import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'
import moment from 'moment'

const initialState = {
    form: {
        isOpened: false,
        current: null,
        edited: null,
        action: null
    },
    sidebar: {
        isShown: true
    },
    dashboard: {
        isManaging: false,
        action: null,
        updated: {
            size: null,
            layout: null
        }
    },
    filters: {
        all: "all",
        this_week:  {
            start: moment().startOf('week').toDate(),
            end: moment().endOf('week').toDate()
        },
        this_month: {
            start: moment().startOf('month').toDate(),
            end: moment().endOf('month').toDate()
        },
        this_year: {
            start: moment().startOf('year').toDate(),
            end: moment().endOf('year').toDate()
        },
        "7_days": {
            start: moment().subtract(7, 'd').toDate(),
            end: moment().toDate()
        },
        "30_days": {
            start: moment().subtract(30, 'd').toDate(),
            end: moment().toDate()
        },
        "3_months": {
            start: moment().subtract(3, 'months').toDate(),
            end: moment().toDate()
        },
        "6_months": {
            start: moment().subtract(6, 'months').toDate(),
            end: moment().toDate()
        },
        "1_year": {
            start: moment().subtract(6, 'year').toDate(),
            end: moment().toDate()
        }
    }
}


const toggleForm = (state, action) => {
    const { data } = action
    if(data){
        return updatedObject(state, {
            form: {
                isOpened: true,
                current: data.form,
                edited: data.edited,
                action: data.edited ? "edit" : "add"
            }
        })
    } else {
        return updatedObject(state, {
            form: initialState.form
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
                ...state.dashboard,
                isManaging: true,
                action: action.action
            }
        })
    } else {
        return updatedObject(state, {
            dashboard: {
                ...state.dashboard,
                isManaging: false,
                action: null,
            }
        })
    }
}

const updateDashboardLayout = (state, action) => {
    const {  layout, size = "md" } = action
    return updatedObject(state, {
        dashboard: {
            ...state.dashboard,
            updated: {
                size,
                layout,
            }
        }
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_FORM: return toggleForm(state, action)
        case actionTypes.TOGGLE_SIDE_BAR: return toggleSidebar(state)
        case actionTypes.TOGGLE_DASHBOARD: return toggleDashboard(state, action)
        case actionTypes.UPDATE_DASHBOARD_LAYOUT: return updateDashboardLayout(state, action)
        default: return state
    }
}

export default reducer