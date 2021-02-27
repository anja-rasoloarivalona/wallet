import React, { useState, useEffect } from 'react'
import { Section, Text, ButtonContainer, AssetsList } from '../Setup-style'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Asset } from '../../../components'
import { Form } from '../../../components/Form/index'
import _ from 'lodash'
import styled from 'styled-components'
import * as actions from '../../../store/actions'

const Container = styled(Section)`
    form {
        margin-top: 4rem !important;
    }
`

const Assets = props => {
    const dispatch = useDispatch()
    const { currentSection, changeSection } = props
    const [ action, setAction ] = useState("adding")
    const [ values, getValues ] = useState(null)

    const {
        text: { currentPage: text},
        user: { assets },
        settings: { currency }
    } = useSelector(state => state)


    const initialInputs = [
        {
            id: "type",
            input_type: "select",
            name: "type",
            label: text.type,
            placeholder: text.type,
            options: [
                {value: "debit_card", label: text.debit_card},
                {value: "credit_card", label: text.credit_card},
                {value: "cash", label: text.cash}
            ],
            required: true
        },
        {
            id: "name",
            input_type: "input",
            type: "text",
            placeholder: text.name,
            label: text.name,
            name: "name",
            required: true
        },
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.balance,
            label: text.balance,
            name: "amount",
            unit: currency ? currency.symbol : null,
            required: true
        }
    ]

    const [inputs, setInputs] = useState(initialInputs)


    useEffect(() => {
        if(values){
            if(values.type === "credit_card" && inputs.length === 3){
                const updatedInputs = inputs.map(input => ({...input}))
                updatedInputs.push({
                    id: "credit_limit",
                    input_type: "input",
                    type: "number",
                    placeholder: "Limit",
                    label: "Limit",
                    name: "credit_limit",
                    unit: currency ? currency.symbol : null,
                    required: true
                })
                setInputs(updatedInputs)
            }

            if(values.type !== "credit_card" && inputs.length > 3){
                const updatedInputs =  inputs.map(input => ({...input}))
                updatedInputs.splice(inputs.length - 1)
                setInputs(updatedInputs)
            }

        }
    },[values])

    const addAssetHandler = asset => {
        const updatedAssets = assets.map(asset => ({...asset}))
        updatedAssets.push(asset)
        dispatch(actions.setAssets(updatedAssets))
        setAction("viewing")
    }

    const assetForm = <Form 
                        inputs={inputs}
                        buttonLabel={text.add}
                        submitHandler={addAssetHandler}
                        cancelLabel={text.skip}
                        cancelHandler={() => changeSection("next")}
                        getValues={values => getValues(values)}
                        submitButtonStyle="full"
                      />

    const assetsList = (
        <>
        <AssetsList>
            {assets.map(asset => <Asset asset={{
                ...asset,
                size:"small",
                style: {
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                }
            }} />)}
        </AssetsList>
        <ButtonContainer>
            <Button square="true" secondary="true" onClick={() => dispatch(actions.toggleForm({form: "assetForm"}))}>{text.add}</Button>
            <Button square="true"  onClick={() => changeSection("next")}>{text.next}</Button>
        </ButtonContainer>
        </>
    )

    return (
        <Container
            currentSection={currentSection}
            active={1}
        >
            <Text>{text.assets_text}</Text>
            {!_.isEmpty(assets) && action === "viewing" && assetsList}
            {_.isEmpty(assets)  && assetForm}
        </Container>
    )
}

export default Assets