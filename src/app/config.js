import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


const GlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto;
    }
`
const Container = styled.div`
    width: 100vw;
    min-height: calc(100vh - 7.5rem);
    display: grid;
    grid-template-columns: 300px repeat(2, 1fr) 300px;
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    margin-top: 7.5rem;
`

const Config = props => {
    const theme = useSelector(state => state.theme)
    axios.defaults.baseURL = process.env.REACT_APP_API_URL  

    return (
        (
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Container>
                        {props.children}
                    </Container>
                </ThemeProvider>
            </BrowserRouter>
        )
    )
}

export default Config