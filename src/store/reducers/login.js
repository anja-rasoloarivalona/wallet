import * as actionTypes from '../actions/actionTypes'

const initialState = {
    userId: null,
    userIsLoggedIn: false,
    token: null,
    userInfo: null
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer