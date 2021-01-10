import styled from 'styled-components'
import { Form } from 'formik'

const Container = styled.div`
    grid-column: 1 / -1;
    height: calc(100vh - 7.5rem);
    display: flex;
    justify-content: center;
    background: ${props => props.theme.background};
    margin-top: 7.5rem;
`

const LoginForm = styled(Form)`
    display: flex;
    flex-direction: column;
    margin-top: 20vh;
    align-items: center;
    width: 90vw;
    max-width: 35rem; 

    button {
        margin-top: 3rem;
    }
`

const Title = styled.div`
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 2rem;
    width: 100vw;
    text-align: center;
`

export {
    Container,
    LoginForm,
    Title
}