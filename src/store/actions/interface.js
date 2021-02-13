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

const updateDashboardLayout = (layout, size) => {
    return {
        type: actionTypes.UPDATE_DASHBOARD_LAYOUT,
        layout,
        size
    }
}
export {
    toggleForm,
    toggleSideBar,
    toggleDashboard,
    updateDashboardLayout
}