import styled from 'styled-components'
import { Form } from 'formik'
import { Button } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    grid-column: 1 / -1;
    min-height: calc(100vh - 7.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.clr_background};
`

const Title = styled.div`
    color: ${props => props.theme.clr_primary};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 2rem;
    width: 100vw;
    text-align: center;
`

const SignupForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90vw;
    max-width: 35rem; 
`

const SignupButton = styled(Button)`
    background: ${props => props.theme.clr_primary};
    color: ${props => props.theme.text};
    padding: 0 7rem;
    border-radius: 2.5rem;
    
`

const OrTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 3rem;
`

const OrText = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${props => props.theme.clr_primary};
    margin: 0 2rem;
`

const OrTextLine = styled.div`
    width: 100%;
    height: 1px;
    background: ${props => props.theme.clr_primary};
`

const Disclaimer = styled.div`
    margin-top: 4rem;
    max-width: 35rem;
    font-size: 1.3rem;
    text-align: center;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 6rem;
`

const SignupOther = styled.div`
    font-size: 1.3rem;
    margin-top: 3rem;
    margin-bottom: 3.5rem;
`

const EmailSentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90vw;
    max-width: 35rem; 
    transform: translateY(-8vh);
`

const EmailSentTitle = styled(Title)`
    margin-bottom: 0;
    font-size: 4rem;
`
const EmailSentTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const EmailSentTitleIcon = styled(FontAwesomeIcon)`
    margin-right: 2rem;
    color: ${props => props.theme.clr_primary};
`

const EmailSentModal = styled.div`
    background: ${props => props.theme.white};
    font-size: 2rem;
    padding: 1rem 2rem;
    margin: 2rem 0;
    border-radius: .6rem;
`
const EmailSentText = styled.div`
    font-size: 1.6rem;
`

const PasswordReqList = styled.ul`
    padding-left: 20px;
`

export {
    Title,
    Container,
    SignupForm,
    ButtonContainer,
    SignupButton,
    Disclaimer,
    OrTextContainer,
    OrText,
    OrTextLine,
    SignupOther,

    PasswordReqList,


    EmailSentContainer,
    EmailSentTitleContainer,
    EmailSentTitle,
    EmailSentTitleIcon,
    EmailSentModal,
    EmailSentText
}