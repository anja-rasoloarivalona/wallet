import React from 'react'
import styled from 'styled-components'
import { fadeIn } from '../assets/animation'

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0,0,0, .7);
    z-index: 45;
`

const ModalContent = styled.div`
    position: absolute;
    top: 25vh;
    left: 0;
    right: 0;
    margin: auto;
    width: 80vw;
    max-width: 64rem;
    min-height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${props => props.theme.white};
    font-size: 1.6rem;
    border-radius: .5rem;
    transition: all .3s ease-in;
    animation: ${fadeIn} .3s linear forwards;
    overflow: hidden;
`


const Modal = props => {
    return (
        <Container>
            <ModalContent>
                {props.children}
            </ModalContent>
        </Container>
    )
}

export  {
    Modal
}
