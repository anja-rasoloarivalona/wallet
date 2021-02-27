import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import * as Yup from 'yup'
import { client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText } from '../Form-Style'
import { Form, formFunctions } from '../../components/form/index.js'

const TransactionForm = props => {

    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)

    const {
        settings,
        categories: { expense, income },
        text: { currentPage: text },
        user: { assets},
        ui: { form }
    } = useSelector(state => state)


    const data = [ {...income, master: "income" } ]
    Object.keys(expense).forEach(item => {
        data.push({
            ...expense[item],
            master: item
        })
    })

    const assetsOptions = []
    assets.forEach(asset => {
        assetsOptions.push({
            value: asset.id,
            label: `${asset.type} - ${asset.name}`
        })
    })

    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 0)
        const { isOpened, action, edited } = form
        if(isOpened && action === "edit" && edited){
            const master_id = edited.type === "income" ? income.master_id : expense[edited.category.master_name].master_id
            const color = edited.type === "income" ? income.color : expense[edited.category.master_name].color
           
           const data = {
               id: edited.id,
               category: text[edited.category.sub_name],
               amount:  edited.amount,
               date:  new Date(edited.date),
               counterparty: edited.counterparty,
               asset_id:  edited.asset_id,
               data: {
                    sub_id: edited.sub_id,
                    master_id,
                    color: color,
                    master_name: edited.category.master_name,
                    sub_name: edited.category.sub_name,
                    sub_icon: edited.category.sub_icon,
                    type: edited.type
               }
           }

           formFunctions.setValues(data)

        }
        return () => {
            setMounted(false)
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
            unit: settings.currency.symbol,
            required: true
        },
        {
            id: "date",
            input_type: "date",
            placeholder: text.date,
            label: text.date,
            name: "date",
            required: true
        },
        {
            id: "counterparty",
            input_type: "input",
            placeholder: text.counterparty_placeholder,
            label: text.counterparty,
            name: "counterparty",
            type: "text",
        },
        {
            id: "asset_id",
            input_type: "select",
            placeholder: text.asset,
            label: text.asset,
            options: assetsOptions,
            name: "asset_id",
            required: true
        }
    ]



    const submit = async values => {
        const data = {
            sub_id: values.data.sub_id,
            asset_id: values.asset_id,
            date: values.date,
            amount: values.amount,
            counterparty: values.counterparty,
            type: values.data.type,
            id: values.id
        }
    
        const action = values.id ? 'edit' : 'add'
        const method = values.id ? "put" : "post"
    
        try {
            const res = await client({
                method,
                url: `/transaction/${action}`,
                data
            })
            props.submitFormHandler(res.data.data)
        } catch(err){
            console.log(err, "Failed to add/edit transaction")
        }
    
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
                    <TopText>{text.transaction}</TopText>
                </Top>
                <Form
                    inputs={inputs}
                    submitHandler={submit}
                    cancelHandler={() => dispatch(actions.toggleForm())}
                    buttonLabel={form.edited ? text.edit : text.add}
                />
            </Content>
        </Container>
    )
}

export default TransactionForm
