import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { AssetForm, TransactionsForm, BudgetForm, GoalForm, Header, Sidebar} from '../elements'
import ErrorModal from '../components/ErrorModal'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { } from '@fortawesome/react-fontawesome'
import { GlobalStyle, Container, Background } from './AppStyle'
library.add(fas)



const App = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    const { initApp } = actions
    const { 
        text : { header, errors: errorText },
        error : { error },
        categories: {expense, income},
        categories,
        user: { isLoggedIn, appIsReady },
        ui: { form, sidebar },
        theme
    } = useSelector(state => state)

    const forms = {
        transactionForm: TransactionsForm,
        budgetForm: BudgetForm,
        assetForm: AssetForm,
        goalForm: GoalForm
    }
    const CurrentForm = form.isOpened ? forms[form.current] : null

    useEffect(() => {
        dispatch(initApp())    
    },[])

    useEffect(() => {
        if(header && expense && income && appIsReady){
            setReady(true)
        }
    },[header, expense, income, appIsReady])


    const submitFormHandler = (data) => {
        dispatch(actions.updateApp(data))
        dispatch(actions.toggleForm())
    }


    if(!ready){
        return (
            <div>Loading</div>
        )
    }

    return (
        <BrowserRouter>
            <ThemeProvider
                theme={{
                    ...theme,
                    ...categories
                }} 
            >
                <GlobalStyle />
                <Container full={sidebar.isShown} isLoggedIn={isLoggedIn}>
                    <Header />
                    <Sidebar />
                    <Background  show={form.isOpened} onClick={() => dispatch(actions.toggleForm())}/>
                    {CurrentForm && (
                        <CurrentForm 
                            errorText={errorText}
                            submitFormHandler={submitFormHandler}
                        />
                    )}
                    <Routes />
                    {error && <ErrorModal />}
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    )
}



export default App