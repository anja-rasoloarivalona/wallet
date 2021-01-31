import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Asset } from '../../../components'


const Container = styled.div`
    margin-bottom: 3rem;
`

const Title = styled.div`
    padding: 3rem 0;
    font-size: 2rem;
`

const Assets = () => {
    const {
        user : { assets },
        text: { currentPage: text }
    } = useSelector(state => state)

    return (
        <Container>
            <Title>{text.assets}</Title>
            {assets.map(asset => <Asset asset={asset} /> )}
        </Container>
    )
}

export default Assets
