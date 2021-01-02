import React, { useState, useEffect } from 'react'
import { renderInput } from '../../functions/form'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components'
import { SelectCategory  } from '../../functions/form'
import { Loader } from '../../components'
import { setDate, client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText, FormComponent, ButtonContainer, LoaderContainer, LoaderText } from '../Form-Style'


const BudgetForm = props => {
    const { errors, touched, handleChange, values, handleBlur, setValues, setFieldValue, isSubmitting } = props
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)
    const {
        text : { currentPage : text },
        settings: { lang, currency },
        categories: { expense : data},
        ui: { budgetForm }
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
            setValues(data)
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
            unit: currency.symbol
        },
    ]

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
                            <Button square="true" type="submit">{budgetForm.edited ? text.edit : text.add}</Button>
                            :   
                            <LoaderContainer>
                                <Loader size="medium"/>
                                <LoaderText>{budgetForm.edited ? text.budget_editing : text.budget_adding}</LoaderText>
                            </LoaderContainer>
                        }
                        </ButtonContainer>
                </FormComponent>
            </Content>
        </Container>
    )
}

const Budget = withFormik({
    mapPropsToValues: () => {
        return {
            category: "",
            amount: "",
            data: {}
        }
    },
    validationSchema: ({ errorText }) => {
        const empty = errorText.required_field
        return Yup.object().shape({
            category: Yup.string().required(empty),
            amount: Yup.string().required(empty),
        })
    },
    handleSubmit: async (values, { props }) => {
        const { submitFormHandler, budgetForm} = props
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
            submitFormHandler(resData, "budgetForm")

        } catch(err){
            console.log(err)
        }

        
    }
})(BudgetForm)


export default Budget