import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    lang: "en"
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LANG: return updatedObject(state, { lang: action.lang })
        default: return  state
    }
}

export default reducer