import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import { Amount } from '../../../components/Amount'
import { RenderLabel } from '../../../functions/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Title, TitleText, TitleCta } from '../Profile-style'


const Container = styled.div`
    width: 100%;
    height: 100%;
    position : relative;
    max-width: 60rem;
    margin-bottom: 3rem;


    @media screen and (max-width: 767px){
        max-width: unset;
    }
`

const Content = styled.div`
    background: ${props => props.theme.surface};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 30vh;
`

const BudgetTable = styled.div`
    width: 90%;
`


const BudgetHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 2rem;
    padding-right: 4rem;
    font-size: 1.4rem;
    
`

const BudgetHeaderItem = styled.div`
    font-weight: 600;
`

const BudgetRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    padding-right: 4rem;
    // background: red;
    font-size: 1.4rem;
    position: relative;
`

const IconContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    color: ${props => props.theme.text};
    cursor: pointer;
    height: min-content;
    padding: 1rem;
    :hover { 
        color: ${props => props.theme.active_text};

        div.budget-cta {
            display: flex;
        }
    }
`

const BudgetRowItem = styled.div``


const Cta = styled.div`
    position: absolute;
    top: 95%;
    right: 0;
    width: 13rem;
    background: ${props => props.theme.surface};
    z-index: 4;
    border-radius: 2px;
    display: none;
    flex-direction: column;
    align-items: space-evenly;
    padding: .5rem 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const CtaItem = styled.div`
    padding: 1.2rem 0;
    padding-left: 2rem;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background}
    }
`



const Budget = () => {
    const dispatch = useDispatch()
    const {
        user : { budgets: data },
        text : { currentPage: text }

    } = useSelector(state => state)

    const editHandler = item => {
        dispatch(actions.toggleForm({
            form: "budgetForm",
            edited: item
        }))
    }

    const renderBudgetItem = (item, index) => {
        return (
            <BudgetRow key={index}>
                <BudgetRowItem>
                    <RenderLabel 
                        item={item.category}
                        type="sub"
                    />
                </BudgetRowItem>
                <BudgetRowItem>
                    <Amount value={item.amount}/>
                </BudgetRowItem>
              
                    <IconContainer>
                        <FontAwesomeIcon 
                            icon="ellipsis-v"
                            size="lg"
                        />
                        <Cta className="budget-cta">
                            <CtaItem onClick={() => editHandler(item)}>Edit</CtaItem>
                            <CtaItem>Delete</CtaItem>
                        </Cta>
                    </IconContainer>
            </BudgetRow>
        )
    }

    return (
        <Container>
            <Title>
                <TitleText>Budget per month</TitleText>
                <TitleCta onClick={() => dispatch(actions.toggleForm({form: "budgetForm"}))}>
                    <FontAwesomeIcon 
                        icon="plus"
                    />
                </TitleCta>
            </Title>
            <Content>
                <BudgetTable>
                    <BudgetHeader>
                        <BudgetHeaderItem>{text.category}</BudgetHeaderItem>
                        <BudgetHeaderItem>{text.amount}</BudgetHeaderItem>
                    </BudgetHeader>
                    {data && data.length > 0 && data.map((item, index) => renderBudgetItem(item, index))}
                </BudgetTable>

            {/* <button onClick={() => dispatch(actions.toggleForm({ form: "budgetForm"}))}>Add</button> */}
            </Content>
        </Container>
    )
}

export default Budget
