import * as actionTypes from './actionTypes'

const toggleTransactionForm = data => {
    return {
        type: actionTypes.TOGGLE_TRANSACTION_FORM,
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
    toggleTransactionForm,
    toggleSideBar,
    toggleDashboard
}