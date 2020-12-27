import styled from 'styled-components'
import { Form } from 'formik'

const Container = styled.div`
    grid-column: 1 / -1;
    height: calc(100vh - 7.5rem);
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.clr_background};
`

const LoginForm = styled(Form)`
    transform: translateY(-14vh);
    display: grid;
    grid-template-columns: 30rem;
    grid-template-rows: repeat(2, max-content);
    row-gap: 1rem;

    input {
        width: 30rem;
    }

    button {
        margin-top: 2rem;
    }
`

export {
    Container,
    LoginForm
}