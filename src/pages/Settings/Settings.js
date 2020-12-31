import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    grid-column: 1 / -1;
    width: calc(100vw - 35rem);
    min-height: calc(100vh - 7.5rem);
    background: ${props => props.theme.clr_background};
    margin-left: 35rem;
    padding-top: 3rem;
    display: flex;
    justify-content: center;
`

const Settings = () => {
    return (
        <Container>
            Settings
        </Container>
    )
}


export default Settings
