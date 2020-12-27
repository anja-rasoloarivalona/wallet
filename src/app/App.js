import { useEffect, useState } from 'react'
import Config from './config'
import Header from '../elements/Header/Header'
import ErrorModal from '../components/ErrorModal'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { getInitialText } from '../translations'


const App = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    const [checkedToken, setCheckedToken] = useState(false)
    const { initText, setTextPathName, getCategories, initCurrentPeriod } = actions
    const { 
        text : { header },
        settings : { lang },
        error : { error },
        categories: {expense, income}
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

    const checkUserToken = () => {
        const token = localStorage.getItem("moneytor-token")
        setCheckedToken(true)
    }


    if(!ready){
        return (
            <div>Loading</div>
        )
    }

    return (
        <Config>
            <Header />
            <Routes />
            {error && <ErrorModal />}
        </Config>
    )
}



export default App