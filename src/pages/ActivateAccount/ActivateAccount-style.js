import styled from 'styled-components'


const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(0,0,0, .7);
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Modal = styled.div`
    width: 90vw;
    width: 35rem; 
    background: ${props => props.theme.white};
    height: 30vh;
    position: relative;
    border-radius: .6rem;

    #activate-loader, .success-animation {
        bottom: 5rem;
    }
`

const Text = styled.div`
    position: absolute;
    bottom: 3.5rem;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 2rem;
    text-align: center;
`

export {
    Container,
    Modal,
    Text
}