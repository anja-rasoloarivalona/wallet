import styled from 'styled-components'

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


const Title = styled.div`
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 3rem;
    text-align: center;
`

const Cta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`


const CtaItem = styled.div`
    font-size: 1.6rem;
    color: ${props => props.theme.text};
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`

const ForgotPassword = styled(CtaItem)`
    position: absolute;
    right: 0;
    top: calc(100% + 5px);
    font-size: 1.4rem;
`

export {
    Container,
    Title,
    Cta,
    CtaItem,
    Modal,
    ForgotPassword
}