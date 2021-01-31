import React from 'react'
import { Container, DateInput, Label, Error } from '../style'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import en from 'date-fns/locale/en-US'
import fr from 'date-fns/locale/fr-CA'
import { registerLocale } from 'react-datepicker'
registerLocale('en', en)
registerLocale('fr', fr)


const DateContainer = styled(Container)`
    .react-datepicker__triangle {
        left: 40px !important;
    }

    .react-datepicker-wrapper {
        border: 1px solid ${props => props.error ?  props.theme.form.error_color  :  props.theme.form.unfocused.border_color};
        border-radius: 4px;
    }

    .react-datepicker-wrapper, .react-datepicker__input-container , .react-datepicker__input-container > input {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 4px;
    }

    .react-datepicker-popper {
        z-index: 20;
    }

    .react-datepicker__input-container > input {
        border: 0px solid black !important;
        padding: 12px 6px;
        padding-left: 20px;


        ::placeholder {
            color: ${props => props.theme.form.unfocused.label_color};
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
`

const DatePicker = props  => {
    const { input, onChange, values, touched, errors } = props
    const { settings: { lang } } = useSelector(state => state)
    const format = lang === "fr" ? "dd-MM-yyyy" : "MM-dd-yyyy"

    return (
        <DateContainer
            key={input.id} style={{...input.containerStyle}}
            error={touched[input.id] && errors[input.id]}
        >
            <DateInput 
                dateFormat={format}
                id={input.id}
                name={input.name}
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
        </DateContainer>
    )
}

export {
    DatePicker
}
