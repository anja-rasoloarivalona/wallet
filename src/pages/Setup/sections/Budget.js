import React, { useState } from 'react'
import { Section, Text, ButtonContainer } from '../Setup-style'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components'
import { CategoryLabel } from '../../../components/form/custom/CategoryInput-style'
import styled from 'styled-components'
import { Loader, Amount } from '../../../components'
import { setDate } from '../../../functions'
import { Form } from '../../../components/form/index'
import * as actions from '../../../store/actions'

const Container = styled(Section)`
    form {
        margin-top: 4rem !important;
    }
`

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


const Budget = props => {

    const dispatch = useDispatch()

    const { currentSection, submitting, submitHandler } = props

    const {
        text: { currentPage: text},
        settings: { currency },
        categories: { expense },
        user: { budgets }
    } = useSelector(state => state)

    const [action, setAction] = useState("adding")


    const data = []
    Object.keys(expense).forEach(item => {
        data.push({
            ...expense[item],
            master: item
        })
    })
    
    const inputs = [
        {   
            id: "category",
            name: "category",
            input_type: "category",
            categories: data,
            required: true
        },
        {
            id: "type",
            name: "type",
            input_type: "select",
            required: true,
            placeholder: "Type",
            label: "Type",
            options: [
                {label: text.variable, value: "variable"},
                {label: text.fixed, value: "fixed"}
            ]
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

    // useEffect(() => {
    //     if(budgets.length > 0){
    //         setAction("viewing")
    //     }
    // }, [budgets])

    // useEffect(() => {
    //     if(Object.keys(errors).length > 0){
    //         setErrors({})
    //     }
    // },[currentSection, errors])


    const addBugetHandler = values => {
        const updatedBudget = budgets.map(item => ( {...item}))

        console.log({
            values,
            updatedBudget
        })

        const budgetData = {
            master_name: values.data.master_name,
            sub_name: values.data.sub_name,
            category: values.category,
            sub_id: values.data.sub_id,
            sub_icon: values.data.sub_icon,
            amount: values.amount,
            used: 0,
            period: setDate(new Date(), "mm-yy", "en"),
            color: values.data.color
        }
        updatedBudget.push(budgetData)
        dispatch(actions.setBudgets(updatedBudget))
        setAction("viewing")
    }

    

    const budgetForm = (
        <Form 
            inputs={inputs}
            submitHandler={addBugetHandler}
            buttonLabel={text.add}
            cancelLabel={text.skip}
            cancelHandler={submitHandler}
            submitButtonStyle="full"
        />
    )


    const renderBudgetItem = item => {
        return (
            <BudgetSectionItem key={item.sub_id}>
                <BudgetSectionItemLabel>
                    <CategoryLabel  item={item} type="sub"/>
                </BudgetSectionItemLabel>
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
                {budgets.map(item => renderBudgetItem(item))}
            </BudgetSection>
            {!submitting && (
                <ButtonContainer>
                    <Button square="true" secondary="true" onClick={() => dispatch(actions.toggleForm({form: "budgetForm"}))}>{text.add}</Button>
                    <Button square="true" onClick={submitHandler}>{text.finish}</Button>
                </ButtonContainer>
            )}

        </>
    )



    return (
        <Container
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
        </Container>
    )
}

export default Budget