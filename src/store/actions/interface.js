import * as actionTypes from './actionTypes'

const toggleForm = data => {
    return {
        type: actionTypes.TOGGLE_FORM,
        data
    }
}

const toggleSideBar = () => {
    return {
        type: actionTypes.TOGGLE_SIDE_BAR
    }
}

const toggleDashboard = action => {
    return {
        type: actionTypes.TOGGLE_DASHBOARD,
        action
    }
}

export {
    toggleForm,
    toggleSideBar,
    toggleDashboard
}