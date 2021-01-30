import React, {useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker'
import ReactSelect, { components } from 'react-select'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const Container = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 4.5rem;
    caret-color: ${props => props.theme.active_text};
    display: flex;
    align-items: center;

    * {
        box-sizing: border-box;
        font-size: 1.4rem;
    }

    .input_cta {
        position: absolute;
        right: 0;
        top: 100%;
        background: red;
    }

    .react-datepicker__triangle {
        left: 40px !important;
    }

    .react-datepicker-wrapper {
        border: 1px solid ${props => props.theme.text};
        border-radius: 4px;
    }

    .react-datepicker-wrapper, .react-datepicker__input-container , .react-datepicker__input-container > input {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .react-datepicker-popper {
        z-index: 20;
    }

    .react-datepicker__input-container > input {
        border: 0px solid black !important;
        padding: 12px 6px;
        padding-left: 20px;
  

        ::placeholder {
            color: ${props => props.theme.text};
        }
        :focus {
            outline: none;
        }
    }

    .react-datepicker {
        width: 40rem;
    }

    .react-datepicker__month-container, .react-datepicker__month {
        width: 100%;
    }

    .react-datepicker__week > div,.react-datepicker__day-name  {
        margin: .8rem
    }

    .react-datepicker__current-month {
        font-size: 1.6rem;
    }

    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        width: 2.7rem;
        padding: 7px 0;
    }

    input::placeholder {
        // color: ${props => props.theme.grey_dark};
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    ${props => {
        if(props.fullWidth){
            return {
                'grid-column':' 1 / -1'
            }
        }
    }}
`
export const Label = styled.label`
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items:center;
    color: ${props => props.theme.text};
    transition: all .2s ease-in;
    opacity: 0;
    font-size: 1.4rem;
    background: ${props => props.theme.surface};
    height: min-content;
    margin: 0;
    padding: 0 5px;
    z-index: 1; 


    ${props => {
        if(props.shown){
            return {
                'transform' : 'translateY(-8.5px) translateX(5px)',
                'opacity' : '1',
                'font-size': "12px"
            }
        }
        if(props.textarea){
            return {
                'bottom': 'unset',
                'margin': 'unset',
                'top': '10px'
            }
        }
    }}
`
export const LabelAction = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 12px;
    font-size: 1.4rem
    :hover {
        color: ${props => props.theme.active_text};
    }
`
export const DateInput = styled(DatePicker)`
    border: 1px solid ${props => props.theme.grey_dark};
    border-radius: 4px;
`
export const AppInput = styled.input`
    height: 45px;
    width: 100%;
    padding-left: 20px;
    border-radius: 4px;
    font-size: 1.4rem;
    border: none;
    border: 1px solid ${props => props.theme.text};

    ::placeholder {
        color: ${props => props.error ? props.theme.red :  props.theme.text};
    }

    :focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.primary};

        + label {
            opacity: 1;
            transform: translateY(-8.5px) translateX(5px);
            font-size: 12px;
            color: ${props => props.theme.primary};
        }
    }
    :not(:placeholder-shown) + label {
        opacity: 1;
        transform: translateY(-8.5px) translateX(5px);
        font-size: 12px;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        --webkit-box-shadow: 0 0 0 30px ${props => props.theme.surface} inset !important;
    }
`
export const Input = styled(Field)`
    height: 45px;
    width: 100%;
    padding-left: 20px;
    border-radius: 4px;
    font-size: 1.4rem;
    border: none;
    border: 1px solid ${props => props.theme.text};
    transition: all .2s ease-in;

    ::placeholder {
        color: ${props => props.error ? "transparent" :  props.theme.text};
    }

    ${props => {
        if(props.error){
            return {
                border: `1px solid ${props.theme.red}`,
                "& + label": {
                    color: props.theme.red
                },
            }
        }
    }}



    :focus {
        outline: none;
        border: 1px solid ${props => props.theme.primary};

        & + label {
            color: ${props => props.theme.primary};
            opacity: 1;
            transform: translateY(-8.5px) translateX(5px);
            font-size: 12px;
        }


        &::placeholder {
            color: transparent;
        }

        & ~ #counter {
            display: block;
        }
    }
    :not(:placeholder-shown) + label {
        opacity: 1;
        transform: translateY(-8.5px) translateX(5px);
        font-size: 12px;
    }


    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px ${props => props.theme.surface} inset !important;
    }

    ${props => {
        if(props.textarea){
            return {
                'resize': 'none',
                'height': '160px !important',
                'padding-top': '10px'
            }
        }
    }}
`
export const Select = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 45px;
   
    border-radius: 4px;

    .select-category_icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
        color: ${props => props.theme.text};
    }
`
export const SelectValue = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 10px;
    color: ${props => props.placeholder ? props.theme.grey_dark : 'initial'};
    border-radius: 4px;
    background: white;
    font-size: 1.4rem !important;
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.text};

`
export const SelectList = styled.ul`
    position: absolute;
    top: calc(100% + 7px);
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    list-style: none;
    padding: 0;
    border: ${props => props.showList ? '1px' : '0px'} solid ${props => props.theme.text};
    transition: height .3s ease-in;
    height: ${props => props.showList ? 'unset' : '0px'};
    z-index: 14;
    background: ${props => props.theme.white};
    border-radius: 4px;
    box-shadow: ${props => props.theme.box_shadow};

    ${props => {
        if(props.maxHeight){
            return {
                'maxHeight': props.maxHeight,
                'overflow': 'overlay'
            }
        }
    }}
`
export const SelectListItem = styled.li`
    padding: 12px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`
export const InputUnit = styled.div`
    position: absolute;
    top: 16px;
    right: 10px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.grey_dark};
    height: min-content;
`
export const Error = styled.div`
    position: absolute;
    bottom: 25px;
    left: 20px;
    font-size: 1.3rem;
    z-index: 13;
    color: ${props => props.theme.red};
`
export const ListContainer = styled.div`
    width: 100%;
    border-radius: 4px;
`

export const CheckContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`
export const CheckBox= styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    width: 1.8rem;
    border: 1px solid ${props => props.theme.text};
    background-color: ${props => props.theme.surface};
    margin-right: 1rem;
    border-radius: 3px;
`
export const CheckMark = styled(FontAwesomeIcon)`
`
export const CheckLabel = styled.div`
`

export const Counter = styled.div`
    text-align: right;
    font-size: 1.2rem;
    position: absolute;
    right: 0px;
    bottom: 25px;
    color: ${props => props.theme.active_text};
    display: none;
`

export const TraillingIcon = styled.div`
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 12px;
`