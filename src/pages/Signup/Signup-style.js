import styled from 'styled-components'
import { Button } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    grid-column: 1 / -1;
    height: calc(100vh - 5.4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.theme.background};
    padding-top: 7rem;
    overflow-y: overlay;
`

const Title = styled.div`
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 3rem;
    width: 100vw;
    text-align: center;
`

const Modal = styled.div`
    background: ${props => props.theme.surface};
    padding: 4rem 4rem;
    width: 90vw;
    max-width: 56rem; 
    border-radius: 5px;
    box-shadow: ${props => props.theme.box_shadow};
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 40rem;
    }

    button {
        background: ${props => props.theme.primary}
    }
`


const OrTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const OrText = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${props => props.theme.text_light};
    margin: 0 2rem;
`

const OrTextLine = styled.div`
    width: 100%;
    height: 1px;
    background: ${props => props.theme.text_light};
`

const Disclaimer = styled.div`
    margin-top: 4rem;
    max-width: 35rem;
    font-size: 1.3rem;
    text-align: center;
    line-height: 1.4;
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
`

const EmailSentTitle = styled.div`
    margin-bottom: 0;
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
`
const EmailSentTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const EmailSentTitleIcon = styled(FontAwesomeIcon)`
    margin-right: 2rem;
    color: ${props => props.theme.text_light};
`

const EmailSentModal = styled.div`
    background: ${props => props.theme.surface};
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
    EmailSentText,
    Modal
}