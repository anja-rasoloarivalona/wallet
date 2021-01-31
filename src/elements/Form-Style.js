import styled from 'styled-components'
import { Form } from 'formik'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 31;
`

const Content = styled.div`
    width: 40vw;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: ${props => props.theme.surface};
    transform: translateX(40vw);
    transition: all .3s ease-in;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${props => {
        if(props.mounted){
            return {
                transform: "translateX(0)"
            }
        }
    }}

    form {
        width: 90%;
        max-width: 57rem;
    }
`

const Top = styled.div`
    padding: 3rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    svg {
        position: absolute;
        top: 2.2rem;
        right: 2rem;
        margin: auto;
        cursor: pointer;
        color: ${props => props.theme.text};
`

const TopText = styled.div`
    font-size: 2rem;
    padding-left: 8rem;
`






const FormComponent = styled(Form)`
    padding: 0 8rem;
    display: flex;
    flex-direction: column;
`


const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5rem;

`


const LoaderContainer = styled.div`
    position: relative;
    height: 16rem;
    display: flex;
    align-items: flex-end;
`

const LoaderText = styled.div`
    font-size: 1.6rem;
`
export {
    Container, 
    Content,
    Top,
    TopText,
    FormComponent,
    ButtonContainer,
    LoaderContainer,
    LoaderText
}