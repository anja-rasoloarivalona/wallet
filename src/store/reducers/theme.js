import * as actionTypes from '../actions/actionTypes'

const initialState = {
    primary: "#5382ac",
    secondary: "#F191B1E",
    greyLight: "#f6f6f6",
    greyDark: "#acadae",
    white: "#FEFDFB",
    black: "#1B1A19",
    red: "#CC0000",

    clr_primary: "#7b7b7b",
    clr_text: "#f5f5f5",
    clr_text_semi_dark: "#bbbbbb",
    clr_text_dark: "#1B1A19",

    clr_background: "#f5f5f5",
    clr_surface: "rgb(20, 20, 20)",
    clr_on_surface: "rgb(46, 46, 46)"
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer