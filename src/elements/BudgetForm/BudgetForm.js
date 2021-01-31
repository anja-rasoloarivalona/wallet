import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { setDate, client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText } from '../Form-Style'
import { Form, formFunctions } from '../../components/form/index'

const BudgetForm = props => {
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)

    const {
        text : { currentPage : text },
        settings: { currency },
        categories: { expense},
        ui: { budgetForm }
    } = useSelector(state => state)


    const data = []
    Object.keys(expense).forEach(item => {
        data.push({
            ...expense[item],
            master: item
        })
    })

    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 0)
        return () => {
            setMounted(false)
        }
    },[])

    useEffect(() => {
        if(budgetForm.isOpened && budgetForm.edited){
            const { amount, category: { master_name, sub_name }, sub_id } = budgetForm.edited
            const data = {
                data : {
                    sub_name,
                    master_name,
                    sub_id
                },
                amount,
                category: text[master_name]
            }
            formFunctions.setValues(data)
        }
    },[])
     
    const inputs = [
        {   
            id: "category",
            name: "category",
            input_type: "category",
            categories: data,
            required: true
        },
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.amount,
            label: text.amount,
            name: "amount",
            unit: currency.symbol
        },
    ]

    const submit = async values => {
        try {
            const data = {
                sub_id: values.data.sub_id,
                amount: values.amount,
                period: setDate(new Date(), "mm-yy", "en")
            }
            const method = budgetForm.edited ? "put" : "post"
            const res = await client({
                method: method,
                url: "/budget",
                data
            })
            const resData = res.data.data
            props.submitFormHandler(resData, "budgetForm")

            } catch(err){
                console.log(err)
            }
    }

    const cancel = () => {
        dispatch(actions.toggleForm({ form: "budgetForm"}))
    }

    return (
        <Container>   
            <Content mounted={mounted}>
                <Top>
                    <FontAwesomeIcon 
                        icon="times-circle"
                        size="3x"
                        onClick={() => dispatch(actions.toggleForm({ form: "budgetForm"}))}
                    />
                    <TopText>{text.budget}</TopText>
                </Top>
                <Form 
                    inputs={inputs}
                    submitHandler={submit}
                    cancelHandler={cancel}
                    buttonLabel={budgetForm.edited ? text.edit : text.add}
                />
            </Content>
        </Container>
    )
}


export default BudgetForm