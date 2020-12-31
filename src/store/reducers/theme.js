import * as actionTypes from '../actions/actionTypes'

const initialState = {
    grey_light: "#f6f6f6",
    grey_dark: "#acadae",
    white: "#FEFDFB",
    black: "#1B1A19",

    red: "#dd1a1a",
    green: "#0dc30d",

    clr_primary: "#7b7b7b",
    clr_text: "#f5f5f5",
    clr_text_semi_dark: "#bbbbbb",
    clr_text_dark: "#1B1A19",

    clr_background: "#f5f5f5",
    clr_surface: "rgb(20, 20, 20)",
    clr_on_surface: "rgb(46, 46, 46)",

    background: "#f5f5f5",
    surface: "#ffffff",
    surface_secondary: "#F6F6F6",
    text: "#c5c5c5",
    active_text: "#161616"
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer