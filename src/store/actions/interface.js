import * as actionTypes from './actionTypes'

const toggleTransactionForm = data => {
    return {
        type: actionTypes.TOGGLE_TRANSACTION_FORM,
        data
    }
}

export {
    toggleTransactionForm
}