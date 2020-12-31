import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    transactionForm: {
        isOpened: false,
        action: null,
        editedTransaction: null
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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_TRANSACTION_FORM: return toggleTransactionForm(state, action)
        default: return state
    }
}

export default reducer