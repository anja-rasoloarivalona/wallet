import * as actionTypes from '../actions/actionTypes'

const initialState = {
    primary: "#5382ac",
    secondary: "#F191B1E",
    grey: "#c3c2c2",
    white: "#FEFDFB",
    black: "#1B1A19",
    red: "red"
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer