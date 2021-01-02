import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Config from './config'
import { AssetForm, TransactionsForm, BudgetForm, Header, Sidebar} from '../elements'
import ErrorModal from '../components/ErrorModal'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import { getInitialText } from '../translations'
import { client } from '../functions'
import * as actions from '../store/actions'

const AddTransaction = styled.button`
    position: fixed;
    z-index: 11;
    right: 5rem;
    top: 2.7rem;
    height: 4.5rem;
    padding: 0 2rem;
    background: ${props => props.theme.active_text};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    border-radius: 2rem;
    color: white;
    min-width: 12rem;
    cursor: pointer;
    border: none;
    :focus {
        outline: none;
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

const App = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    const [checkedToken, setCheckedToken] = useState(false)
    const { initText, setTextPathName, getCategories, initCurrentPeriod, initLang } = actions
    const { 
        text : { header, errors: errorText },
        settings : { lang },
        error : { error },
        categories: {expense, income},
        user: { isLoggedIn },
        ui: { openedForm,  dashboard, budgetForm }
    } = useSelector(state => state)


    const forms = {
        transactionForm: TransactionsForm,
        budgetForm: BudgetForm,
        assetForm: AssetForm
    }
    const CurrentForm = openedForm ? forms[openedForm] : null

    useEffect(() => {
        const pathname = window.location.pathname
        const text = getInitialText(lang, [pathname])
        dispatch(initLang())
        dispatch(setTextPathName(pathname))
        dispatch(initText(text))
        dispatch(getCategories())
        dispatch(initCurrentPeriod())
        checkUserToken()
    },[])

    useEffect(() => {
        if(header && expense && income && checkedToken){
            setReady(true)
        }
    },[header, expense, income, checkedToken])

    const checkUserToken = async () => {
        const token = localStorage.getItem("moneytor-token")
        if(token){
            try {
                const res = await client.post("/verify-user-token", { token: token })
                const resData = res.data.data
                dispatch(actions.updateApp({
                    ...resData,
                    token
                }))
                setCheckedToken(true)
            }  catch(err){
                console.log(err)
                setCheckedToken(true)
                dispatch(actions.clearUser())
            }
        } else {
            setCheckedToken(true)
        }

    }

    const submitFormHandler = (data, form) => {
        dispatch(actions.updateApp(data))
        dispatch(actions.toggleForm({ form }))
    }


    if(!ready){
        return (
            <div>Loading</div>
        )
    }

    return (
        <Config>
            <Header />
            {!dashboard.isManaging && (
                <AddTransaction onClick={() => dispatch(actions.toggleForm({ form: "transactionForm" }))}>
                    Add transaction
                </AddTransaction>
            )}
            {isLoggedIn && <Sidebar />}
            <Background  show={openedForm}/>
            {openedForm && (
                    <CurrentForm 
                        errorText={errorText}
                        submitFormHandler={submitFormHandler}
                        budgetForm={budgetForm}
                    />
            )}
            <Routes />
            {error && <ErrorModal />}
        </Config>
    )
}



export default App