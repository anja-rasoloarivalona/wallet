import React from 'react'
import styled from 'styled-components'
import Language from './sections/Language'
import Currency from './sections/Currency'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { client } from '../../functions'

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: 100vw;
    background: ${props => props.theme.clr_background};
    display: flex;
    padding-left: 7rem;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    padding: 3rem 0;
    font-size: 3rem;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
`



const Settings = () => {
    const dispatch = useDispatch()
    const {
        text : { currentPage: text },
    } = useSelector(state => state)

    const changeCurrency = async currency => {
        dispatch(actions.setCurrency(currency))
        try {
            await client.post("/settings/currency", {currency})
        } catch(err){
            console.log(err)
        }
    }

    return (
        <Container>
            <Title>{text.settings}</Title>
            <Content>
                <Language />
                <Currency
                    changeCurrency={changeCurrency}
                />
            </Content>   
        </Container>
    )
}


export default Settings
