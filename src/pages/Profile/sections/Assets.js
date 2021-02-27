import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Asset } from '../../../components'
import { Title, TitleText, TitleCta } from '../Profile-style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../../../store/actions'

const Container = styled.div`
    margin-bottom: 3rem;
`

const Assets = () => {
    const {
        user : { assets },
        text: { currentPage: text }
    } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Container>
            <Title>
                <TitleText>{text.assets}</TitleText>
                <TitleCta onClick={() => dispatch(actions.toggleForm({form: "assetForm"}))}>
                    <FontAwesomeIcon 
                        icon="plus"
                    />
                </TitleCta>
            </Title>
            {assets.map(asset => <Asset asset={asset} /> )}
        </Container>
    )
}

export default Assets
