import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    header: null,
    currentPage: null,
    errors: null,
    pathname: null
}

const initText = (state, action) => {
    const { text } = action
    return updatedObject(state, {
        header: text.header,
        currentPage: text.currentPage,
        errors: text.errors,
        pathname: text.pathname
    })
}   

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_TEXT: return initText(state, action)
        default: return state
    }
}

export default reducer