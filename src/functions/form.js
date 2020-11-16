import React, {useState, useEffect } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import ReactSelect from 'react-select'

export const Container = styled.div`
    position: relative;
    width: 100%;
    margin-top: 30px;
    caret-color: ${props => props.theme.primary};

    * {
        box-sizing: border-box;
        font-family: Lato;
        font-size: 1.6rem;
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

    .react-datepicker__input-container > input {
        border: 1px solid ${props => props.theme.grey};
        padding: 12px 6px;
        :focus {
            outline: none;
        }
    }

    input::placeholder {
        color: ${props => props.theme.grey};
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
    color: ${props => props.theme.grey};
    transition: all .2s ease-in;
    opacity: 0;


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
        color: ${props => props.theme.grey}
    }
`

export const DateInput = styled(DatePicker)`
    border: 1px solid ${props => props.theme.grey};
    border-radius: 4px;
`

export const Input = styled(Field)`
    height: 40px;
    width: 100%;
    padding-left: 10px;
    border: 1px solid ${props => props.theme.grey};
    border-radius: 4px;

    ::placeholder {
        color: ${props => props.theme.grey};
    }

    :focus {
        outline: none;
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

    svg {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
    }
`
export const SelectValue = styled.div`
    height: 100%;
    width: 100%;
    padding: 12px 6px;
    border: 1px solid ${props => props.theme.grey};
    color: ${props => props.placeholder ? props.theme.grey : 'initial'};
    border-radius: 4px;

`
export const SelectList = styled.ul`
    position: absolute;
    top: calc(100% + 7px);
    left: 0;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    border: ${props => props.showList ? '1px' : '0px'} solid ${props => props.theme.grey};
    transition: height .3s ease-in;
    height: ${props => props.showList ? 'unset' : '0px'};
    overflow: hidden;
    z-index: 14;
    background: ${props => props.theme.white};
    border-radius: 4px;
    box-shadow: 0px 6px 12px -5px rgba(83,83,97,1);

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
        background: ${props => props.theme.primary};
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
    color: ${props => props.theme.white}
`

export const Error = styled.div`
    position: absolute;
    top: calc(100% + 10px);

    top: 0;
    transform: translateY(-20px);

    z-index: 13;
    color: ${props => props.theme.cà.red};
`
export const ListContainer = styled.div`
    > div > div:first-child {
        z-index: 14;
    }
    > div > div:not(:first-child):last-child {
        z-index: 15;
    }
`

export const renderInput = (props) => {
    const inputType = props.input.input_type;
    switch(inputType){
        case "input":
            return  renderNormalInput(props);
        case "textarea":
            return renderTextArea(props);
        case "select":
            return RenderSelectInput(props);
        case  "date":
            return renderDatePicker(props);
        default: return renderNormalInput(props)
    }
}


const RenderSelectInput = props => {

    const {input, index, errors, touched, values } = props
    const theme = useSelector(state => state.theme)

    const handleChange = value => {
        props.onChange(input.name, value.value)
    }

    const handleBlur = () => {
        props.onBlur(input.name, true)
    }

    const borderStyle = `1px solid ${theme.grey}`

    const style = {
        control: (provided, state) => ({
          ...provided,
          boxShadow: "none",
          border: state.isFocused ? borderStyle : borderStyle,
          cursor: 'pointer',
          '&:hover': {
            border: state.isFocused ? borderStyle : borderStyle,
          }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: theme.grey
        }),
        menuList: (provided) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: '4px',
            boxShadow: '0px 6px 12px -5px rgba(83,83,97,1)'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? theme.primary : theme.white,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? theme.primary : theme.white
            }
        })
      };

      

    return (
        <Container key={index} style={{...input.style}}>
             <Label htmlFor={input.id} shown={values[input.name] !== ''} style={{...input.labelStyle}}>
                {input.label}
            </Label>
            <ListContainer>
                <ReactSelect
                    id={input.id}
                    options={input.options}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    styles={style}
                    placeholder={input.placeholder}
                    isSearchable={false}
                    value={input.options.filter(({value}) => value === values[input.name])}
                    // defaultValue={{...input.defaultValue}}
                    components={{
                        IndicatorSeparator: () => null
                    }}
                />
            </ListContainer>
            {touched[input.name] && errors[input.name] && (
                <Error>
                    {errors[input.name]} 
                </Error>
            )}
        </Container>
    )
}

export const renderNormalInput = props => {
    const {input, index, errors, touched} = props

    const clickHandler = () => {
        if(input.disabled && input.disabledHandler){
            input.disabledHandler()
        }
    }
    return (
        <Container key={index} style={{...input.style}} onClick={clickHandler}>
                <Input 
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    disabled={input.disabled}
                />
                <Label htmlFor={input.id} style={{...input.labelStyle}}>
                    {input.label}
                </Label>
                {input.children && input.children()}
                {input.unit && (
                    <InputUnit>
                        {input.unit}
                    </InputUnit>
                )}
                {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
                )}
        </Container>
    )
}

const renderTextArea = props => {
    const { input, index, touched, errors } = props
    return (
        <Container
            key={index}
            style={{...input.style}}
        >
            <Input 
                id={input.id}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                component="textarea"
                textarea
            />
            <Label htmlFor={input.id} textarea style={{...input.labelStyle}}>
                {input.label}
            </Label>
            {input.children && input.children()}
            {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
            )}
        </Container>
    )
}

const renderDatePicker = props => {
    const { input, index, onChange, values, touched, errors } = props

    return (
        <Container
            key={index}
            style={{...input.style}}
        >   
            <DateInput 
                id={input.id}
                name={input.name}
                dateFormat={input.dateFormat}
                minDate={input.minDate ? input.minDate : null}
                maxDate={input.maxDate ? input.maxDate : null}
                showTimeInput={input.showTimeInput}
                selected={values[input.name]}
                onChange={date => onChange(input.name, date)}
                autoComplete="off"
                placeholderText={input.label}
            />
            <Label htmlFor={input.id} style={{...input.labelStyle}} shown={values[input.name] !== ''} >
                {input.label}
            </Label>
            {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
            )}
        </Container>
    )
}
