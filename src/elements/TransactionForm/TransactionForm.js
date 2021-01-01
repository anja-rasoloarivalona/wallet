import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SelectCategory, renderLabel, renderInput } from '../../functions/form'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { Form, withFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Loader } from '../../components'
import { client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, .7);
    z-index: 15;
`

const Content = styled.div`
    width: 40vw;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: ${props => props.theme.clr_background};
`

const Top = styled.div`
    height: 7.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    svg {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 8rem;
        cursor: pointer;
    }
`

const TopText = styled.div`
    font-size: 2rem;
    margin-left: 3rem;
`

const FormContainer = styled.div`
    // background: red;
    padding: 0 3rem;
    display: flex;
    justify-content: center;
`

const FormComponent = styled(Form)`
    max-width: 40rem;
    width: 100%;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 6rem;
    position: relative;
    height: 6rem;
`




const TransactionForm = props => {
    const dispatch = useDispatch()
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, isSubmitting } = props
    const {
        settings,
        categories: { expense, income },
        text: { currentPage: text },
        user: { assets},
        ui: { transactionForm }
    } = useSelector(state => state)

    const data = [ income ]
    Object.keys(expense).forEach(item => {
        data.push(expense[item])
    })

    const assetsOptions = []
    assets.forEach(asset => {
        assetsOptions.push({
            value: asset.id,
            label: `${asset.type} - ${asset.name}`
        })
    })

    useEffect(() => {
        const { isOpened, action, editedTransaction } = transactionForm
        if(isOpened && action === "edit" && editedTransaction){

            console.log(editedTransaction.category.sub_name)
            console.log(text[editedTransaction.category.sub_name] )

            const master_id = editedTransaction.type === "income" ? income.master_id : expense[editedTransaction.category.master_name].master_id
            const color = editedTransaction.type === "income" ? income.color : expense[editedTransaction.category.master_name].color
            const data = [
                { field: "id", value:  editedTransaction.id},
                { field: "category", value: text[editedTransaction.category.sub_name] },
                { field: "amount", value:  editedTransaction.amount},
                { field: "date", value:   new Date(editedTransaction.date)},
                { field: "counterparty", value:  editedTransaction.counterparty},
                { field: "asset_id", value:  editedTransaction.asset_id},
                { field: "data", value:  {
                    sub_id: editedTransaction.sub_id,
                    master_id,
                    color: color,
                    sub_name: editedTransaction.category.sub_name,
                    sub_icon: editedTransaction.category.sub_icon,
                    type: editedTransaction.type
                }}
                
            ]
            data.forEach( item => {
                setFieldValue(item.field, item.value)
            })
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
            <Content>
                <Top>
                    <FontAwesomeIcon 
                        icon="chevron-left"
                        size="3x"
                        color="grey"
                        onClick={() => dispatch(actions.toggleTransactionForm())}
                    />
                    <TopText>New transactions</TopText>
                </Top>
                <FormContainer>
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
                            {!isSubmitting && (
                                <>
                                <Button square="true" secondary="true">
                                    Cancel
                                </Button>
                                <Button square="true" type="submit">
                                    Add
                                </Button>
                                </>
                            )}
                            {isSubmitting && <Loader />}
                        </ButtonContainer>
                    </FormComponent>
                </FormContainer>
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

        const { addEditTransactionHandler } = props

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
            console.log("res", res)
            addEditTransactionHandler(res.data.data)
        } catch(err){
            console.log(err, "Failed to add/edit transaction")
        }

    }
})(TransactionForm)

export default EnhancedTransactionForm
