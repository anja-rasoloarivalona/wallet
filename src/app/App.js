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


const App = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    const [checkedToken, setCheckedToken] = useState(false)
    const { initText, setTextPathName, getCategories, initCurrentPeriod } = actions
    const { 
        text : { header, errors: errorText },
        settings : { lang },
        error : { error },
        categories: {expense, income},
        user: { isLoggedIn },
        ui: { transactionForm }
    } = useSelector(state => state)

    useEffect(() => {
        const pathname = window.location.pathname
        const text = getInitialText(lang, [pathname])
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