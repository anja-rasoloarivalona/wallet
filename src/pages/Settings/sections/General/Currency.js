import React, { useEffect }  from 'react'
import { withFormik, Form as FormikForm } from 'formik'
import { Section, Title, TextContainer, Text} from '../../Settings-style'
import { renderInput } from '../../../../functions'
import { useSelector  } from 'react-redux'
import { currencies } from '../../../../assets/currencies'
import styled from 'styled-components'

const Button = styled.button`
    display: none;
`


const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue } = props

    const {
        settings: { currency },
        text: { currentPage : text}
    } = useSelector(state => state)

    const currenciesOptions = []
    
    currencies.forEach((currency, index) => {
        currenciesOptions.push({
            value:  index,
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

    useEffect(() => {
        const { currency : _currency } = values
        if(_currency !== "" && currencies[_currency].name !== currency.name){
            const submit = document.getElementById("change_currency")
            submit.click()
        }
    },[values])

    useEffect(() => {
            if(currency){
                const index = currencies.findIndex(item => item.name === currency.name)
                setFieldValue("currency", index)
            }
    },[currency])

    return (
        <Section showList>
            <Title>{text.currency}</Title>
            <TextContainer>
                <Text>{text.currency_text_a}</Text>
                <Text>{text.currency_text_b}</Text>
            </TextContainer>
            <FormikForm>
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
                <Button type="submit" id="change_currency"/>
            </FormikForm>
            
        </Section>
    )
}

const Currency = withFormik({
    mapPropsToValues: () => {
        return {
            currency: ""
        }
    },
    handleSubmit: (values, {props}) => {
        const { currency } = values
        const { changeCurrency } = props
        const data = currencies[currency]
        changeCurrency(data)
    }
})(Form)

export default Currency
