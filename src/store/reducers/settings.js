import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    lang: "en",
    currency: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LANG: return updatedObject(state, { lang: action.lang })
        case actionTypes.SET_CURRENCY: return updatedObject(state, {currency: action.currency})
        default: return  state
    }
}

export default reducer