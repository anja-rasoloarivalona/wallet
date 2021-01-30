import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'


const form = {
    unfocused: {
        border_color:  "#c5c5c5",
        label_color: "#c5c5c5",
        icon_fill_color: "#c5c5c5",
    },
    focused: {
        border_color: "#161616",
        label_color: "#161616",
        icon_fill_color: "#161616",
   
    },
    background_color: "#ffffff",
    error_color: "#ff3333",
    caret_color: "#2E3E4E",
    active: "#2E3E4E",

 
}


const themes = {
    light: {
        background: "#f5f5f5",
        surface: "#ffffff",
        primary: "#2E3E4E",
        text: "#c5c5c5",
        active_text: "#161616",
        box_shadow: "0px 1px 2px -1px rgb(113 113 113 / 75%)",
        box_shadow_dark: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
        box_shadow_inset: "inset 2px 2px 3px 0 rgb(143 143 143 / 20%), inset -2px -2px 6px 0 rgb(255 255 255 / 80%)",
        gradient: function(level){
            return `rgba(0, 0, 0, ${level})`
        }
    },
    dark: {
        background: "#202020",
        surface: "#272727",
        surface_secondary: "#313131",
        text: "#5c5c5c",
        active_text: "#fafafa",
        box_shadow: "0px 1px 2px -1px rgb(113 113 113 / 75%)",
        box_shadow_inset: "inset 2px 2px 3px 0 rgb(0 0 0 / 50%), inset -2px -2px 6px 0 rgb(41 41 41 / 80%)",
        gradient: function(level){
            return `rgba(255, 255, 255, ${level})`
        }
    }
}


const initialState = {
    grey_light: "#f6f6f6",
    grey_dark: "#acadae",
    white: "#FEFDFB",
    black: "#1B1A19",
    red: "#ff3333",
    green: "#0dc30d",
    clr_primary: "#7b7b7b",
    clr_text: "#f5f5f5",
    clr_text_semi_dark: "#bbbbbb",
    clr_text_dark: "#1B1A19",
    clr_background: "#f5f5f5",
    clr_surface: "rgb(20, 20, 20)",
    clr_on_surface: "rgb(46, 46, 46)",

    ...themes.light,
    form: {
        ...form
    }
}


const updateThemeColor = (state, action) => {
    const { theme } = action
    return updatedObject(state, {
        ...themes[theme]
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_THEME_COLORS : return updateThemeColor(state, action) 
        default: return state
    }
}

export default reducer