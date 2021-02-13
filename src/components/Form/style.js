import React, { useEffect } from 'react'
import styled from 'styled-components'
import { config } from './config'
import { Field as FormikField } from 'formik'
import ReactSelect, { components } from 'react-select'
import { FontAwesomeIcon as Icon  } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import ReactDatePicker from 'react-datepicker'

const {
    space_between_inputs,
    space_input_left,
    font_size,
    height,
    border_radius ,
    label_font_size,
    error_font_size
} = config

const inputStyle = {
    height,
    width: "100%",
    paddingLeft: space_input_left,
    borderRadius: border_radius,
}
const showLabelStyle = {
    opacity: 1,
    transform: "translateY(-8.5px) translateX(5px)",
}

const Container = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: ${space_between_inputs};
    caret-color: ${props => props.theme.form.caret_color};

    * {
        box-sizing: border-box;
        font-size: ${font_size};
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`
const Label = styled.label`
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    color: ${props => props.theme.form.unfocused.label_color};
    transition: all .2s ease-in;
    opacity: 0;
    height: min-content;
    margin: 0;
    padding: 0 5px;
    z-index: 1;
    font-size: ${label_font_size};
    background: ${props => props.theme.form.background_color};

    ${props => {
        if(props.shown){
            return {...showLabelStyle}
        }
    }}

    ${props => {
        if(props.isFocused){
            return {
                color: props.theme.form.focused.label_color
            }
        }
    }}
    
`
const AppInput = styled.input`
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
            color: ${props => props.theme.form.focused.label_color};
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
        -webkit-box-shadow: 0 0 0 30px ${props => props.theme.form.background_color} inset !important;
    }
`
const Field = styled(FormikField)`
    ${{...inputStyle}};
    border: 1px solid ${props => props.theme.form.unfocused.border_color};
    
    &::placeholder {
        color: ${props => props.theme.form.unfocused.label_color};
    };

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border_color};
        &::placeholder {
            color: transparent;
        }
        & + label {
            color: ${props => props.theme.form.focused.label_color};
            ${{...showLabelStyle}}
        }
        & ~ #counter {
            display: block;
        }
    };

    &:not(:placeholder-shown) + label {
        ${{...showLabelStyle}}
    };

    ${props => {
        if(props.error){
            return {
                border: `1px solid ${props.theme.form.error_color}`,
                "& + label": {
                    color: props.theme.form.error_color
                },
            } 
        }
    }};

    ${props => {
        if(props.textarea){
            return {
                'resize': 'none',
                'height': '160px !important',
                'padding-top': '10px'
            }
        }
    }};
    
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px ${props => props.theme.form.background_color} inset !important;
    }
`
const Error = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    left: ${space_input_left};
    font-size: ${error_font_size};
    z-index: 13;
    color: ${props => props.theme.form.error_color};
`
const Unit = styled.div`
    position: absolute;
    top: 16px;
    right: 10px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.form.unfocused.label_color};
    height: min-content;
`
const SelectListContainer = styled.div`
    width: 100%;
    border-radius: ${border_radius};
`
const SelectInput = props => {
    const  { input, onChange, onBlur, values, errors, currentValue, touched } = props

    const _value = values ? values[input.name] : currentValue
    const _options = input.options.filter(option => option.value !== _value)
    const theme = useSelector(state => state.theme)

    const DropdownIndicator = props => {
        return (
          <components.DropdownIndicator {...props}>
            <Icon 
                icon="chevron-down"
                size="lg"
            />
          </components.DropdownIndicator>
        );
    };

    const selectStyle = (theme, customStyle) => {

        const unfocusedBorderStyle = `1px solid ${theme.form.unfocused.border_color}`
        const focusedBorderStyle = `1px solid ${theme.form.focused.border_color}`
        const errorStyle = `1px solid ${theme.form.error_color}`
  
        const background = theme.form.background_color
        let custom_control = {}

        if(customStyle){
             if(customStyle.custom_control){
                custom_control = customStyle.custom_control
             }
        }


        return {
            control: (provided, state) => {
                return  {
                    ...provided,
                    boxShadow: "none",
                    height,
                    border: touched && errors && touched[input.name] && errors[input.name] ?  errorStyle : state.isFocused ? focusedBorderStyle : unfocusedBorderStyle,
                    backgroundColor: background,
                    cursor: 'pointer',
                    paddingLeft: space_input_left,
                    '& svg': {
                        color: state.isFocused ? theme.form.focused.icon_fill_color : theme.form.unfocused.icon_fill_color,
                    },
                    '&:hover': {
                        border: state.isFocused ? focusedBorderStyle :  unfocusedBorderStyle,
                    },
                    " > div": {
                        paddingLeft: 0,
                        marginRight: "4px",
                        " > div": {
                            marginLeft: 0
                        }
                    },
                    ...custom_control
                }
            },
            placeholder: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "transparent" : theme.form.unfocused.label_color,
                fontSize: font_size,
                marginLeft: 0,
            }),
            menu: (provided) => ({
                ...provided,
                zIndex: 14
            }),
            menuList: (provided) => ({
                ...provided,
                paddingTop: 0,
                paddingBottom: 0,
                borderRadius: border_radius,
                boxShadow: theme.form.box_shadow,
                backgroundColor: theme.form.background_color,
                zIndex: 14
            }),
            option: (provided, state) => ({
                ...provided,
                height,
                display: "flex",
                alignItems: "center",
                fontSize: font_size,
                '&:hover': {
                    backgroundColor: theme.form.select.optionHoverBackground,
                    color: theme.form.select.optionColor
                },
                backgroundColor: theme.form.background_color,
                cursor: 'pointer',
            })
          }
    } ; 

    return (
        <SelectListContainer>
            <ReactSelect 
                onChange={onChange}
                onBlur={onBlur ? onBlur : null}
                onFocus={props.focusHandler}
                options={_options}
                placeholder={input.required ? `${input.placeholder} \u002A` : input.placeholder}  
                isDisabled={input.isDisabled || _options.length === 0}
                isSearchable={input.isSearchable ? true : false}
                value={input.options.filter(({value}) => value === _value)}
                styles={selectStyle(theme, input.customStyle)}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: input.isDisabled || _options.length === 0 ? () => null : DropdownIndicator
                }}
            />
        </SelectListContainer>
    )
}


const DateInput = styled(ReactDatePicker)`
    border: 1px solid ${props => props.theme.form.unfocused.border_color};
`

const Counter = styled.div`
    text-align: right;
    font-size: 1.2rem;
    position: absolute;
    right: 0px;
    top: calc(100% + 5px);
    color: ${props => props.theme.form.focused.label_color};
    display: none;
`


export {
    Container,
    Label,
    AppInput,
    Field,
    Error,
    Unit,
    SelectInput,
    DateInput,
    Counter
}
