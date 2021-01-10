import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


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
    background: ${props => props.theme.clr_background};
    display: grid;
    grid-template-columns: 300px repeat(2, 1fr) 300px;
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    overflow-y: overlay;
    transition: all .3s ease-in;

    ${props => {
        if(props.isLoggedIn){
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
`

const Config = props => {
    const {
        theme,
        ui: { sidebar },
        user: { isLoggedIn },
        categories
    }= useSelector(state => state)
    axios.defaults.baseURL = process.env.REACT_APP_API_URL  

    return (
        (
            <BrowserRouter>
                <ThemeProvider
                    theme={{
                        ...theme,
                        ...categories
                    }}
                >
                    <GlobalStyle />
                    <Container
                        full={sidebar.isShown}
                        isLoggedIn={isLoggedIn}
                    >
                        {props.children}
                    </Container>
                </ThemeProvider>
            </BrowserRouter>
        )
    )
}

export default Config