import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Amount, Loader } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../../store/actions'
import { setDate } from '../../functions'

const Container = styled.div`
    position: fixed;
    top: 5.4rem;
    left: 0;
    width: ${props => props.full ?  "calc(100vw - 25rem)" : "calc(100vw - 7rem)"};
    margin-left: ${props => props.full ? "25rem" : "7rem"};
    height: 9rem;
    background: ${props => props.theme.background};
    
    padding-left: 4rem;
    padding-right: 3rem;

    z-index: 10;
    transition: all .3s ease-in;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const BalanceContainer = styled.div`
     & > div:last-child {
        font-size: 2.5rem;
        color: ${props => props.theme.text};
     }
`

const BalanceText = styled.div`
    font-size: 1.6rem;
    margin-bottom: .8rem;
    font-weight: 600;
    color: ${props => props.theme.text_light};

`

const CtaContainer = styled.div`
    width: 22rem;
    height: 6rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Cta = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    border-radius: 50%;
    cursor: pointer;

    svg {
        color: ${props => props.theme.surface};
    }

`
const CtaList = styled.ul`
    position: absolute;
    top: 6rem;
    right: 0;
    width: 22rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.box_shadow_dark};
    list-style:none;
    font-size: 1.6rem;
    border-radius: 3px;
    overflow: hidden;

`

const CtaListItem = styled.li`
    padding: 1rem;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`


const DashboardHeader = props  => {
    const { isSubmitting,saveDashboard } = props
    const dispatch = useDispatch()
    const {
        ui : { sidebar, dashboard },
        user: { assets },
        text: { currentPage: text}
    } = useSelector(state => state)

    const [balance, setBalance] = useState(0)
    const [showList, setShowList ] = useState(false)

    useEffect(() => {
        if(assets){
            let currentBalance = 0
            assets.forEach(asset => {
                currentBalance += parseInt(asset.amount)
            })
            setBalance(currentBalance)
        }
    },[assets])

    const actionHandler = action => {
        if(dashboard.action === action){
            dispatch(actions.toggleDashboard())
        } else {
            dispatch(actions.toggleDashboard(action))
        }
    }

    const ctaDta = [
        {label: text.add_transaction, form: "transactionForm"},
        {label: text.add_asset, form: "assetForm"},
        {label: text.add_budget, form: "budgetForm"}
    ]

    return (
        <Container
            full={sidebar.isShown}
            onMouseLeave={() => setShowList(false)}
        >
            <BalanceContainer>
                <BalanceText>Balance</BalanceText>
                <Amount value={balance}/>
            </BalanceContainer>
            <CtaContainer
                onMouseEnter={() => setShowList(true)}
            >
                <Cta>
                        <FontAwesomeIcon 
                            icon="plus"
                        />
                        {showList && (
                            <CtaList>
                                {ctaDta.map((action, index) => (
                                    <CtaListItem
                                        key={index}
                                        onClick={() => dispatch(actions.toggleForm({ form: action.form}))}
                                    >
                                        {action.label}
                                    </CtaListItem>
                                ))}
                            </CtaList>              
                        )}
   
                </Cta>
            </CtaContainer>

        </Container>
    )
}

export default DashboardHeader
