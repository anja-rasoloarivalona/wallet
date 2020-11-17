import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    header: null,
    currentPage: null
}

const initText = (state, action) => {
    const { text } = action
    return updatedObject(state, {
        header: text.header,
        currentPage: text.currentPage
    })
}   

const setText = (state, action ) => {
    const { text } = action
    return updatedObject(state, {
        currentPage: text
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_TEXT: return initText(state, action)
        case actionTypes.SET_TEXT: return setText(state, action)
        default: return state
    }
}

export default reducer