import { useEffect, useState } from 'react'
import Config from './config'
import Header from '../elements/Header/Header'
import Sidebar from '../elements/Sidebar/Sidebar'
import ErrorModal from '../components/ErrorModal'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { getInitialText } from '../translations'
import { client } from '../functions'
import TransactionForm from '../elements/TransactionForm/TransactionForm'
import styled from 'styled-components'


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
        ui: { transactionForm, dashboard }
    } = useSelector(state => state)

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

    const addEditTransactionHandler = data => {
        dispatch(actions.updateApp(data))
        dispatch(actions.toggleTransactionForm())
    }


    if(!ready){
        return (
            <div>Loading</div>
        )
    }

    const displayTransactionForm = isLoggedIn && transactionForm.isOpened


    return (
        <Config>
            <Header />
            {!dashboard.isManaging && (
                <AddTransaction onClick={() => dispatch(actions.toggleTransactionForm({ action: "add" }))}>
                    Add transaction
                </AddTransaction>
            )}
            {isLoggedIn && <Sidebar />}

            {displayTransactionForm && (
                <TransactionForm 
                    errorText={errorText}
                    addEditTransactionHandler={addEditTransactionHandler}
                />
            )}
            <Routes />
            {error && <ErrorModal />}
        </Config>
    )
}



export default App