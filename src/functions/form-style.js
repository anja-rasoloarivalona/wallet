import React, {useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker'
import ReactSelect, { components } from 'react-select'


export const Container = styled.div`
    position: relative;
    width: 100%;
    margin-top: 30px;
    caret-color: ${props => props.theme.clr_primary};

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
        color: ${props => props.theme.grey_dark};
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


    ${props => {
        if(props.shown){
            return {
                'transform' : 'translateY(-33px) translateX(-10px)',
                'opacity' : '1'
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
    height: 40px;
    width: 100%;
    padding-left: 10px;
    border-radius: 4px;
    font-size: 1.4rem;
    border: none;
    border-bottom: 1px solid transparent;

    ::placeholder {
        color: ${props => props.theme.text};
    }

    :focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.clr_primary};
    }
    :not(:placeholder-shown) + label {
        opacity: 1;
        transform: translateY(-33px) translateX(-10px);
    }
    :-webkit-autofill,
    :-webkit-autofill:hover, 
    :-webkit-autofill:focus, 
    :-webkit-autofill:active  {
    :-webkit-box-shadow: 0 0 0 30px white inset !important;
        background: white !important;

    }
`

export const Input = styled(Field)`
    height: 40px;
    width: 100%;
    padding-left: 10px;
    border-radius: 4px;
    font-size: 1.4rem;
    border: none;
    border-bottom: 1px solid transparent;

    ::placeholder {
        color: ${props => props.theme.text};
    }

    :focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.clr_primary};
    }
    :not(:placeholder-shown) + label {
        opacity: 1;
        transform: translateY(-33px) translateX(-10px);
    }
    :-webkit-autofill,
    :-webkit-autofill:hover, 
    :-webkit-autofill:focus, 
    :-webkit-autofill:active  {
    :-webkit-box-shadow: 0 0 0 30px white inset !important;
        background: white !important;

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
    height: 100%;
    height: 40px;

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

`
export const SelectList = styled.ul`
    position: absolute;
    top: calc(100% + 7px);
    left: 0;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    border: ${props => props.showList ? '1px' : '0px'} solid ${props => props.theme.grey_dark};
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
                'overflow': 'auto'
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
        background: ${props => props.theme.clr_primary};
        color: ${props => props.theme.white};
    }
`
export const InputUnit = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${props => props.theme.grey_dark};
`
export const Error = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    font-size: 1.4rem;
    top: 0;
    transform: translateY(-20px);

    z-index: 13;
    color: ${props => props.theme.red};
`
export const ListContainer = styled.div`

    > div > div {
        border: none;
        :hover {
            border: none;
        }
    }
    > div > div:first-child > div:first-child {
        overflow: unset;
    }
    > div > div:first-child {
        z-index: 14;
    }
    > div > div:not(:first-child):last-child {
        z-index: 15;
    }
`