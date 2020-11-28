import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {Button} from './Button'
import * as actions from '../store/actions'
import { fadeIn } from '../assets/animation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0,0,0, .7);
    z-index: 5;
`

const Modal = styled.div`
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
    padding: 2rem 4rem;
`

const Top = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Bottom = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const ModalText = styled.div`
    margin: 3rem 0;
    font-size: 1.6rem;
`

const ModalTitle = styled.div`
    margin: 3rem 0;
    font-size: 2rem;
    text-align: center;
    line-height: 1.4;
`
const Cta = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const ModalButton = styled(Button)`
    min-width: 45%;
`

const ErrorModal = () => {
    const dispatch = useDispatch()
    const {error} = useSelector(state => state.error)
    const { errors: text } = useSelector(state => state.text)
    const { red } = useSelector(state => state.theme)
    const { clearError } = actions

    return (
        <Container>
            <Modal>
                <Top>
                    <FontAwesomeIcon 
                        icon={"exclamation-triangle"}
                        size="2x"
                        color={red}
                    />
                    <ModalTitle>
                        {text[error]}
                    </ModalTitle>
                </Top>
                <Bottom>
                    {/* <ModalText>
                        Please login with your address email or reset your password.
                    </ModalText> */}
                    <Cta>
                        <ModalButton color="warning" design="solid" onClick={() => dispatch(clearError())}>
                            Close
                        </ModalButton>
                        {/* <ModalButton color="warning" design="light" onClick={() => dispatch(clearError())}>
                            Reset password
                        </ModalButton> */}
                    </Cta>
                </Bottom>
            </Modal>
        </Container>
    )
}

export default ErrorModal
