import React, { useState, useEffect } from 'react'
import { Section, Title, Text, SetupForm, ButtonContainer } from '../Setup-style'
import { renderInput } from '../../../functions/form'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Button } from '../../../components'
import { SelectCategory, renderLabel } from '../../../functions/form'
import styled from 'styled-components'
import { Loader, Amount } from '../../../components'


const BudgetSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    max-width: 50rem;
    border-radius: 5px;
    margin-bottom: 2rem;

    background: white;
    margin-top: 3rem;

    > div:first-child {
        border-bottom: 1px solid grey;
    }
`

const BudgetSectionItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-size: 1.6rem;
    padding: 1rem 2rem;
`

const BudgetSectionItemTitle = styled.div`
    font-size: 1.6rem;
    padding: 1rem 0;
`

const BudgetSectionItemLabel = styled.div`
    padding: 1rem 0;
`

const BudgetSectionItemAmount = styled.div``

const LoaderContainer = styled.div`
    position: relative;
    height: 16rem;
    display: flex;
    align-items: flex-end;
`

const LoaderText = styled.div`
    font-size: 1.6rem;

`


const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, currentSection, budget, currency, setErrors, submitting } = props
    const { currentPage : text } = useSelector(state => state.text)
    const { lang } = useSelector(state => state.settings)
    const { expense : data } = useSelector(state => state.categories)
    const [action, setAction] = useState("adding")
    
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

    useEffect(() => {
        if(budget.length > 0){
            setAction("viewing")
        }
    }, [budget])

    useEffect(() => {
        if(Object.keys(errors).length > 0){
            setErrors({})
        }
    },[currentSection, errors])


    const budgetForm = (
        <SetupForm>
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
            {!submitting && (
                <ButtonContainer>
                    {budget.length === 0  &&  <Button square="true" secondary="true">{text.skip}</Button> }
                    {budget.length > 0 && action === "adding" &&  <Button square="true" secondary="true" onClick={() => setAction("viewing")}>{text.cancel}</Button>}   
                    <Button square="true" type="submit">{text.add}</Button>
                </ButtonContainer>
            )}
        </SetupForm>
    )

    const renderBudgetItem = item => {
        return (
            <BudgetSectionItem key={item.sub_id}>
                <BudgetSectionItemLabel>{renderLabel(item.data, "sub")}</BudgetSectionItemLabel>
                <BudgetSectionItemAmount>
                    <Amount value={item.amount}/>
                </BudgetSectionItemAmount>
            </BudgetSectionItem>
        )
    }

    const budgetSection = (
        <>
            <BudgetSection>
                <BudgetSectionItem>
                    <BudgetSectionItemTitle>
                        {text.category}
                    </BudgetSectionItemTitle>
                    <BudgetSectionItemTitle>
                    {text.amount}
                    </BudgetSectionItemTitle>      
                </BudgetSectionItem>
                {budget.map(item => renderBudgetItem(item))}
            </BudgetSection>
            {!submitting && (
                <ButtonContainer>
                    <Button square="true" secondary="true" onClick={() => setAction("adding")}>{text.add}</Button>
                    <Button square="true">{text.finish}</Button>
                </ButtonContainer>
            )}

        </>
    )

    return (
        <Section
            currentSection={currentSection}
            active={2}
        >   
            <Text>{text.assets_text}</Text>
            {action === "adding" && budgetForm}
            {action === "viewing" && budgetSection}
            {submitting && (
                <LoaderContainer>
                    <Loader size="medium"/>
                    <LoaderText>Setting up your account...</LoaderText>
                </LoaderContainer>
            )}
        </Section>
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
    handleSubmit: (values, {props}) => {
        const { budget, setBudget} = props
        const updatedBudget = budget.map(item => ( {...item}))
        updatedBudget.push({
            ...values
        })
        setBudget(updatedBudget)
    }
})(Form)


export default Budget