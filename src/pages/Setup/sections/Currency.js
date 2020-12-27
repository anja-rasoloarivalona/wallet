import React from 'react'
import { currencies } from '../../../assets/currencies'
import { Section, Text, SetupForm, ButtonContainer } from '../Setup-style'
import { renderInput } from '../../../functions/form'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Button } from '../../../components'
import styled from 'styled-components'

const SectionCurrency = styled(Section)`
    padding-top: 15vh;
`

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, currentSection } = props
    const { currentPage : text } = useSelector(state => state.text)

    const currenciesOptions = []

    currencies.forEach((currency, index) => {
        currenciesOptions.push({
            value:  currency,
            label: `${currency.cc} -  ${currency.name}`
        })
    })

    const input = {
        id: "currency",
        input_type: "select",
        name: "currency",
        label: text.currency,
        placeholder: text.choose_currency,
        options: currenciesOptions,
        isSearchable: true,
        labelStyle: {
            display: "none"
        }
    }

    return (
        <SectionCurrency
            currentSection={currentSection}
            active={0}
        >
            <Text>{text.currency_text_a}</Text>
            <Text>{text.currency_text_b}</Text>
            <SetupForm>
                {renderInput({
                    input,
                    index: 0,
                    errors,
                    touched,
                    handleChange,
                    values,
                    onBlur: handleBlur,
                    onChange: setFieldValue
                })}
                <ButtonContainer>
                    <Button type="submit" square="true">{text.next}</Button>
                </ButtonContainer>
            </SetupForm>
        </SectionCurrency>
    )
}

const Currency = withFormik({
    mapPropsToValues: () => {
        return {
            currency: ""
        }
    },
    validationSchema: ({ errorText, text }) => {
        const empty = errorText.required_field
        return Yup.lazy(values => {
            if(values.currency === "" || values.currency === undefined){
                return Yup.object().shape({
                    currency: Yup.string()
                    .required(empty)
                })
            } else {
                const currency = values.currency.symbol
                return Yup.object().shape({
                    currency: Yup.string()
                    .required(empty)
                })
            }
        })
    },
    handleSubmit: (values, {props}) => {
        const { currency } = values
        const { setCurrency, changeSection } = props
        setCurrency(currency)
        changeSection("next")
    }
})(Form)

export default Currency
