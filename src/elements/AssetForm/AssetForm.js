import React, { useState, useEffect }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText } from '../Form-Style'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { client } from '../../functions'
import { Form, formFunctions } from '../../components/form/index.js'
import styled from 'styled-components'
import Asset from '../../pages/Dashboard/items/Assets'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'

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
    const location = useLocation()
    const [mounted, setMounted] = useState(false)
    const [values, getValues] = useState({})
    const {
        text : { currentPage : text },
        settings: { currency },
        ui: { form },
        theme,
        user: { assets }
    } = useSelector(state => state)

    let initialInputs = [
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
            isDisabled: form.edited ? true : false,
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
    const [inputs, setInputs] = useState(initialInputs)




    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 0)
        return () => {
            setMounted(false)
        }
    },[])

    useEffect(() => {
        if(form.isOpened && form.edited){
            const { amount, name, id, type } = form.edited
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



    const submit = asset => {
        if(location.pathname === `/${text.link_setup}`){
            submitToRedux(asset)
        } else {
            submitToServer(asset)
        }
    }
    
    const submitToServer = async  data => {
        try {
            
            const method = !_.isEmpty(data.id) ? "put" : "post"
            const res = await client({
                method: method,
                url: "/asset",
                data
            })
            const resData = res.data.data
            props.submitFormHandler(resData)
           
        } catch(err){
            console.log(err)
        }
    }

    const submitToRedux = asset => {
        const updatedAssets = assets.map(asset => ({...asset}))
        updatedAssets.push(asset)
        dispatch(actions.setAssets(updatedAssets))
        dispatch(actions.toggleForm())
    }
    
    return (
        <Container>
            <Content mounted={mounted}>
                <Top>
                    <FontAwesomeIcon 
                        icon="times-circle"
                        size="3x"
                        onClick={() => dispatch(actions.toggleForm())}
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
                    cancelHandler={() => dispatch(actions.toggleForm())}
                    getValues={getValues}
                    buttonLabel={form.edited ? text.edit : text.add}
                />
            </Content>        
        </Container>
    )
}

export default AssetForm
