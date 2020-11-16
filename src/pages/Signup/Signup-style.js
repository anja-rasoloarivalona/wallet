import styled from 'styled-components'
import { Form } from 'formik'

const Container = styled.div`
    grid-column: 2 / 4;
    height: calc(100vh - 5rem);
    display: flex;
    align-items: center;
    justify-content: center;
    > * {
        transform: translateY(-14vh);
    }
`

const SignupForm = styled(Form)`
    display: grid;
    grid-template-columns: 35rem;
    grid-template-rows: repeat(2, max-content);

    button {
        margin-top: 3rem;
    }
`
const Modal = styled.div`
    text-align: center;
`

const ModalTitle = styled.h1`
    margin-bottom: 2rem;
    font-size: 3rem;
`

const ModalTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ModalText = styled.div`
    display: block;
    font-size: 1.4rem;
    line-height: 1.4;

    ${props => {
        if(props.index === 1){
            return {
                fontWeight: 600,
                fontSize: "1.6rem",
                color: props.theme.primary,
                margin: "1rem 0"
            }
        }
    }}
`

export {
    Container,
    SignupForm,
    Modal,
    ModalTitle,
    ModalTextContainer,
    ModalText
}