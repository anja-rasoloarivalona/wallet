import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto;      
        &::-webkit-scrollbar {
            display: none !important;
        }
    }
`

const Container = styled.div`
    width: ${props => props.full ? " calc(100vw - 25rem)" : "calc(100vw - 7rem)"};
    margin-left: ${props => props.full ? "25rem" : "7rem"};
    background: ${props => props.theme.background};
    display: grid;
    grid-template-columns: 300px repeat(2, 1fr) 300px;
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    overflow-y: overlay;
    transition: all .3s ease-in;
    padding-top: 5.4rem;
    min-height: calc(100vh - 5.4rem);

    ${props => {
        if(props.isLoggedIn && window.location.pathname !== "/"){
            if(props.full){
                return {
                    marginLeft: "25rem",
                    width: "calc(100vw - 25rem)"
                }
            } else {
                return {
                    marginLeft: "7rem",
                    width: "calc(100vw - 7rem)"
                }
            }
        } else {
            return {
                marginLeft: 0,
                width: "100vw"
            }
        }
    }}

    @media (max-width: 767px){
        width: 100vw;
        margin-left: 0;
    }
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: rgba(0, 0, 0, .5);
    opacity: -1;
    transition: opacity .1s ease-in;

    ${props => {
        if(props.show){
            return {
                zIndex: 30,
                opacity: 1
            }
        }
    }}
`

export {
    GlobalStyle,
    Container,
    Background
}
