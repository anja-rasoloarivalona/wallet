import * as actionTypes from '../actions/actionTypes'


const initText = text => {
    return {
        type: actionTypes.INIT_TEXT,
        text
    }
}

const setText = text => {
    return {
        type: actionTypes.SET_TEXT,
        text
    }
}

export {
    initText,
    setText
}