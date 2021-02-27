import React from 'react'
import { currencies } from '../../../assets/currencies'
import { Section, Text } from '../Setup-style'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Form } from '../../../components/Form/index'
import * as actions from '../../../store/actions'

const SectionCurrency = styled(Section)`
    padding-top: 15vh;

    form {
        width: 40rem;
        margin-top: 2rem !important;
    };

`

const Currency = props => {
    const dispatch = useDispatch()
    const { currentSection, changeSection } = props
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
        required: true,

        labelStyle: {
            display: "none"
        }
    }

    const chooseCurrency = ({currency}) => {
        dispatch(actions.setCurrency(currency))
        changeSection("next")
    }

    return (
        <SectionCurrency
            currentSection={currentSection}
            active={0}
        >
            <Text>{text.currency_text_a}</Text>
            <Text>{text.currency_text_b}</Text>
            <Form 
                inputs={[input]}
                submitHandler={chooseCurrency}
                buttonLabel={text.next}
            />
        </SectionCurrency>
    )
}

export default Currency
