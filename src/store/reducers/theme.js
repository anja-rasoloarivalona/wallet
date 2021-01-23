import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const themes = {
    light: {
        background: "#f5f5f5",
        surface: "#ffffff",
        surface_secondary: "#e9e9e9",
        text: "#c5c5c5",
        active_text: "#161616",
        box_shadow: "0px 1px 2px -1px rgb(113 113 113 / 75%)",
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
    red: "#dd1a1a",
    green: "#0dc30d",
    clr_primary: "#7b7b7b",
    clr_text: "#f5f5f5",
    clr_text_semi_dark: "#bbbbbb",
    clr_text_dark: "#1B1A19",
    clr_background: "#f5f5f5",
    clr_surface: "rgb(20, 20, 20)",
    clr_on_surface: "rgb(46, 46, 46)",

    ...themes.light
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