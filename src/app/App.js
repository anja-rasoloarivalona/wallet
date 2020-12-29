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


const App = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    const [checkedToken, setCheckedToken] = useState(false)
    const { initText, setTextPathName, getCategories, initCurrentPeriod } = actions
    const { 
        text : { header },
        settings : { lang },
        error : { error },
        categories: {expense, income},
        user: { isLoggedIn }
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
        console.log({
            token
        })
        if(token){
            try {
                const res = await client.post("/verify-user-token", { token })
                console.log("res", res)
                const resData = res.data.data
                const { assets, budgets, email, id, setting, username } = resData
                dispatch(actions.setUser({
                    id,
                    token,
                    username,
                    email,
                    assets
                }))
                dispatch(actions.setBudget(budgets))
                dispatch(actions.setCurrency(JSON.parse(setting.currency)))
                setCheckedToken(true)
            }  catch(err){
                console.log('ouups', err.message)
                setCheckedToken(true)
                // dispatch(actions.clearUser())
            }
        } else {
            setCheckedToken(true)
        }

    }


    if(!ready){
        return (
            <div>Loading</div>
        )
    }

    return (
        <Config>
            <Header />
            {isLoggedIn && <Sidebar />}
            <Routes />
            {error && <ErrorModal />}
        </Config>
    )
}



export default App