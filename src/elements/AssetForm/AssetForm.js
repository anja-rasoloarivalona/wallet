import React, { useState, useEffect }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText } from '../Form-Style'
import * as Yup from 'yup'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { client } from '../../functions'
import { Form, formFunctions } from '../../components/form/index'
import styled from 'styled-components'
import Asset from '../../pages/Dashboard/items/Assets'
import _ from 'lodash'

const Preview = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    margin-bottom: 6rem;
`



const AssetForm = props => {

    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)
    const [values, getValues] = useState({})
    const {
        text : { currentPage : text },
        settings: { currency },
        ui: { assetForm },
        theme
    } = useSelector(state => state)

    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 0)
        return () => {
            setMounted(false)
        }
    },[])

    useEffect(() => {
        if(assetForm.isOpened && assetForm.edited){
            const { amount, name, id, type } = assetForm.edited
            const data = {
                name,
                amount,
                id,
                type
            }
            formFunctions.setValues(data)
        }
    },[])

    useEffect(() => {
        // const updatedValues = { ...values}
        // console.log({
        //     oo: values.amount
        // })
        // if(values.amount === ""){
        //     updatedValues.amount = 0
        //     formFunctions.setValues(updatedValues)
        // }
        // if(values.amount){
        //     console.log({
        //         number: values.amount,
        //         test: values.amount.toString()[0]
        //     })
        //     if(values.amount.toString()[0] === 0){
        //         updatedValues.amount = parseFloat(values.amount.toString().substring(1))
        //         formFunctions.setValues(updatedValues)
        //     }
        // }

    },[values])


    let inputs = [
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
            disabled: assetForm.edited ? true : false,
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
            placeholder: text.amount,
            label: text.amount,
            name: "amount",
            unit: currency.symbol,
            required: true
        },
    ]

    const submit = async values => {
        const { name, amount, id, type} = values
        try {
            
            const method = id ? "put" : "post"
            const data = {
                name,
                amount,
                id,
                type
            }
            const res = await client({
                method: method,
                url: "/asset",
                data
            })
            const resData = res.data.data
            props.submitFormHandler(resData, "assetForm")
        } catch(err){
            console.log(err)
        }
    }

    const cancel = () => {
        dispatch(actions.toggleForm({ form: "assetForm"}))
    }


    
    return (
        <Container>
            <Content mounted={mounted}>
                <Top>
                    <FontAwesomeIcon 
                        icon="times-circle"
                        size="3x"
                        onClick={() => dispatch(actions.toggleForm({ form: "assetForm"}))}
                    />
                    <TopText>{text.asset}</TopText>
                </Top>
                <Preview>
                    <Asset 
                        asset={values}
                        style={{
                            width: "40rem",
                            maxWidth: "40rem",
                            height: "20rem",
                            boxShadow: theme.form.box_shadow,
                            borderRadius: "1.5rem"
                        }}
                    />
                </Preview>
                <Form 
                    inputs={inputs}
                    submitHandler={submit}
                    cancelHandler={cancel}
                    getValues={getValues}
                    buttonLabel={assetForm.edited ? text.edit : text.add}
                />
            </Content>        
        </Container>
    )
}

export default AssetForm
