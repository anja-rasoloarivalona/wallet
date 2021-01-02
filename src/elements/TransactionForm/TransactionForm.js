import React, { useEffect, useState } from 'react'
import { SelectCategory, renderInput } from '../../functions/form'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Loader } from '../../components'
import { client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText, FormComponent, ButtonContainer, LoaderContainer, LoaderText } from '../Form-Style'


const TransactionForm = props => {
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, isSubmitting, setValues } = props
    const {
        settings,
        categories: { expense, income },
        text: { currentPage: text },
        user: { assets},
        ui: { transactionForm }
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
        const { isOpened, action, edited } = transactionForm
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

           setValues(data)
           
           
        }
        return () => {
            setMounted(false)
        }
    },[])


    const inputs = [
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.amount,
            label: text.amount,
            name: "amount",
            unit: settings.currency.symbol
        },
        {
            id: "date",
            input_type: "date",
            placeholder: text.date,
            label: text.date,
            name: "date",
        },
        {
            id: "counterparty",
            input_type: "input",
            placeholder: text.counterparty_placeholder,
            label: text.counterparty,
            name: "counterparty",
            type: "text"
        },
        {
            id: "asset_id",
            input_type: "select",
            placeholder: text.asset,
            label: text.asset,
            options: assetsOptions,
            name: "asset_id"
        }
    ]

    return (
        <Container>
            <Content mounted={mounted}>
                <Top>
                    <FontAwesomeIcon 
                        icon="times-circle"
                        size="3x"
                        onClick={() => dispatch(actions.toggleForm({ form: "transactionForm"}))}
                    />
                    <TopText>{text.transaction}</TopText>
                </Top>
                <FormComponent>
                    <SelectCategory 
                            data={data}
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                    />
                    {inputs.map((input, index) => renderInput({
                            input,
                            index,
                            errors,
                            touched,
                            handleChange,
                            values,
                            onBlur: handleBlur,
                            onChange: setFieldValue
                    }))}
                    <ButtonContainer>
                        {!isSubmitting ?
                                <>
                                    <Button square="true" secondary="true">
                                        {text.cancel}
                                    </Button>
                                    <Button square="true" type="submit">
                                        {transactionForm.edited ? text.edit : text.add}
                                    </Button>
                                </> :
                                <LoaderContainer>
                                        <Loader size="medium"/>
                                        <LoaderText>{transactionForm.edited ? text.transaction_editing : text.transaction_adding}</LoaderText>
                                </LoaderContainer>
                        }
                    </ButtonContainer>
                </FormComponent>
            </Content>
        </Container>
    )
}

const EnhancedTransactionForm = withFormik({
    mapPropsToValues: () => {
        return {
            category: "",
            data: {},
            amount: "",
            date: "",
            counterparty: "",
            asset_id: "",
            id: ""
        }
    },
    validationSchema: ({ errorText }) => {
        const empty = errorText.required_field
        return Yup.object().shape({
            category: Yup.string().required(empty),
            amount: Yup.string().required(empty),
            date: Yup.date().required(empty),
            asset_id: Yup.string().required(empty),
            
        })
    },
    handleSubmit: async (values, {props}) => {

        const { submitFormHandler } = props

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
            submitFormHandler(res.data.data, "transactionForm")
        } catch(err){
            console.log(err, "Failed to add/edit transaction")
        }

    }
})(TransactionForm)

export default EnhancedTransactionForm
