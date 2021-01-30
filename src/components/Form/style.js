import React, { useSelector } from 'react'
import styled from 'styled-components'
import { config } from './config'
import { Field as FormikField } from 'formik'

const {
    space_between_inputs,
    space_input_left,
    font_size,
    height,
    border_radius ,
    label_font_size
} = config

const inputStyle = {
    height,
    width: "100%",
    paddingLeft: space_input_left,
    borderRadius: border_radius,
}

const showLabelStyle = {
    opacity: 1,
    transform: "translateY(-8.5px) translateX(5px)"
}


const Container = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: ${space_between_inputs};
    caret-color: ${props => props.theme.form.cart_color};

    * {
        box-sizing: border-box;
        font-size: ${font_size};

    }
`

const Label = styled.label`
    position: absolute;
    left: 10px;
    top: 10px;
    color: ${props => props.theme.form.focused.label_color};
    transition: all .2s ease-in;
    opacity: 0;
    height: min-content;
    margin: 0;
    padding: 0 5px;
    z-index: 1;
    font-size: ${label_font_size};
    
`

const Input = styled.input`
    ${{...inputStyle}};
    border: 1px solid ${props => props.theme.form.unfocused.border_color};

    &::placeholder {
        color: ${props => props.theme.form.unfocused.label_color};
    }

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border_color};
        &::placeholder {
            color: transparent;
        }
        & + label {
            ${{...showLabelStyle}}
        }
        & ~ #counter {
            display: block;
        }
    }
    &:not(:placeholder-shown) + label {
        ${{...showLabelStyle}}
    }

    ${props => {
        if(props.error){
            return {
                border: `1px solid ${props.theme.form.error_color}`,
                "& + label": {
                    color: props.theme.form.error_color
                },
            } 
        }
    }}

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        --webkit-box-shadow: 0 0 0 30px ${props => props.theme.form.background_color} inset !important;
    }
`
const Field = styled(FormikField)`
    ${{...inputStyle}};
    border: 1px solid ${props => props.theme.form.unfocused.border_color};
    &::placeholder {
        color: ${props => props.theme.form.unfocused.label_color};
    }
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border_color};
        &::placeholder {
            color: transparent;
        }
        & + label {
            ${{...showLabelStyle}}
        }
        & ~ #counter {
            display: block;
        }
    }
    &:not(:placeholder-shown) + label {
        ${{...showLabelStyle}}
    }
    ${props => {
        if(props.error){
            return {
                border: `1px solid ${props.theme.form.error_color}`,
                "& + label": {
                    color: props.theme.form.error_color
                },
            } 
        }
    }}
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        --webkit-box-shadow: 0 0 0 30px ${props => props.theme.form.background_color} inset !important;
    }
`

export {
    Container,
    Label,
    Input,
    Field
}
