import React, { useState, useEffect } from 'react'
import { Container, Content, Top, TopText } from '../Form-Style'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { client } from '../../functions'
import { Form } from '../../components/form/index.js'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 const GoalForm = () => {

    const dispatch = useDispatch()

    const [mounted, setMounted] = useState(false)

    const {
        text : { currentPage : text },
        settings: { currency },
        ui: { assetForm },
        theme,
        user: { assets, goal }
    } = useSelector(state => state)

    const inputs = [
        {
            id: "amount",
            input_type: "input",
            name: "amount",
            type: "number",
            label: text.amount,
            placeholder: text.amount,
            required: true,
            unit: currency.symbol
        },
        {
            id: "per_month",
            input_type: "input",
            name: "per_month",
            type: "number",
            label: "Per month",
            placeholder: "Per month",
            required: true,
            unit: currency.symbol
        },
    ]

    const submit = async data => {
        try {
            const res = await client.post("/user/goal", data)
            console.log({
                res
            })
        } catch(err){
            console.log(err)
            console.log(err.response)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 0)
        return () => {
            setMounted(false)
        }
    },[])



    return (
        <Container>
            <Content mounted={mounted}>
                <Top>
                    <FontAwesomeIcon 
                            icon="times-circle"
                            size="3x"
                            onClick={() => dispatch(actions.toggleForm())}
                    />
                <TopText>Goal</TopText>
                </Top>
                <Form 
                    inputs={inputs}
                    submitHandler={submit}
                    cancelHandler={() => dispatch(actions.toggleForm())}
                    buttonLabel={goal && goal.amount ? text.edit : text.add}
                />
            </Content>
        </Container>
    )
}

export default GoalForm
