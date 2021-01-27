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
    height: 10rem;
    background: ${props => props.theme.background};
    padding-left: 8rem;
    z-index: 10;
    transition: all .3s ease-in;
    padding-right: 25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const BalanceContainer = styled.div`
     & > div:last-child {
        font-size: 2.5rem;
        color: ${props => props.theme.active_text};
     }
`

const BalanceText = styled.div`
    font-size: 1.6rem;
    margin-bottom: .8rem;
    font-weight: 600;
    color: ${props => props.theme.text};
`
const Cta = styled.div`
     width: 30vw;
     max-width: 40rem;
     height: 5rem;
     border-radius: 2rem;
    box-shadow: ${props => props.theme.box_shadow_inset};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 2rem;
`

const CtaItem = styled.div`
     margin: 0 1rem;
     font-size: 1.4rem;
     display: flex;
     align-items: center;
     cursor: pointer;
     color: ${props => props.theme.text};

     svg {
         margin-right: 1rem;
     }

     :hover {
        color: ${props => props.theme.active_text};
     }

     ${props => {
         if(props.active){
             return {
                 color: props.theme.active_text
             }
         }
     }}
`

const SaveContainer = styled.div`
    position: fixed;
    z-index: 11;
    right: 5rem;
    top: 3rem;
    height: 4.5rem;
    padding: 0 2rem;
    background: ${props => props.theme.active_text};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    border-radius: 1rem;
    color: white;
    min-width: 12rem;
`

const Save = styled.div`

`

const CtaItemText = styled.div``

const DashboardHeader = props  => {
    const { isSubmitting,saveDashboard } = props
    const dispatch = useDispatch()
    const {
        ui : { sidebar, dashboard },
        user: { assets }
    } = useSelector(state => state)
    const [balance, setBalance] = useState(0)

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

    return (
        <Container full={sidebar.isShown}>
            <BalanceContainer>
                <BalanceText>Balance</BalanceText>
                <Amount value={balance}/>
            </BalanceContainer>
            {/* <Cta>
                <CtaItem onClick={() => actionHandler("isEditing")} active={dashboard.action === "isEditing"}>
                    <FontAwesomeIcon 
                        icon="pencil-alt"
                        size="1x"
                    />
                    <CtaItemText>Edit</CtaItemText>
                </CtaItem>
                <CtaItem>
                    <FontAwesomeIcon 
                        icon="plus"
                        size="1x"
                    />
                    <CtaItemText>Add</CtaItemText>
                </CtaItem>
                <CtaItem>
                    <FontAwesomeIcon 
                        icon="trash"
                        size="1x"
                    />
                    <CtaItemText>Remove</CtaItemText>
                </CtaItem>
                {dashboard.isManaging && (
                    <SaveContainer>
                        {isSubmitting ? 
                               <Loader /> :
                               <Save onClick={saveDashboard}>
                                 Save
                              </Save>
                        }    
                    </SaveContainer>
                )}

            </Cta> */}
        </Container>
    )
}

export default DashboardHeader
