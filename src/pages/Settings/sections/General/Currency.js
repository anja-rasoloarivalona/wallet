import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Select } from '../../../../components/Form/unvalidate'
import * as actions from '../../../../store/actions'
import { Section, Title, TextContainer, Text} from '../../Settings-style'
import { currencies } from '../../../../assets/currencies'
import { client } from '../../../../functions'

const Currency = () => {
    const dispatch = useDispatch()

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

    const selectCurrencyHandler = async value => {
        const chosen = currencies[value]
        dispatch(actions.setCurrency(chosen))
        try {
            await client.post("/settings/currency", {currency: chosen})
        } catch(err){
            console.log(err)
        }
    }

    let currentValue = null
    if(currency){
        const currentIndex = currencies.findIndex(curr => curr.cc === currency.cc)
        if(currentIndex > -1){
            currentValue = currentIndex
        }
    }

    
    return (
        <Section>
            <Title>{text.currency}</Title>
            <TextContainer>
                <Text>{text.currency_text_a}</Text>
                <Text>{text.currency_text_b}</Text>
            </TextContainer>
            <Select 
                input={{
                    id: "currency",
                    options: currenciesOptions,
                    isSearchable: true,
                }}
                currentValue={currentValue}
                onChange={selectCurrencyHandler}
            />
            
        </Section>
    )


}

export default Currency
