import styled from 'styled-components'
import { Form } from 'formik'

const Container = styled.div`
    grid-column: 1 / -1;
    height: calc(100vh - 7.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.theme.background};
    margin-top: 7.5rem;
    padding-top: 7rem;
    overflow-y: overlay;
`

const LoginForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    max-width: 35rem; 
`

const Title = styled.div`
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 2rem;
    width: 100vw;
    text-align: center;
`

const Cta = styled.div`
    display: flex;
    align-items: center;
    // background: red;
    width: 100%;
    margin-top: 2rem;
    padding-left: 1rem;
`

const CtaItem = styled.div`
    font-size: 1.6rem;
    color: ${props => props.theme.text};
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`
const ButtonContainer = styled.div`
    margin-top: 7rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`


export {
    Container,
    LoginForm,
    Title,
    Cta,
    CtaItem,
    ButtonContainer
}