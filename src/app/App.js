import { useEffect } from 'react'
import Config from './config'
import Header from '../elements/Header/Header'
import ErrorModal from '../components/ErrorModal'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { getInitialText } from '../translations'


const App = () => {
    const dispatch = useDispatch()
    const { initText, setTextPathName } = actions
    const { 
        text : { header },
        settings : { lang },
        error : { error }
    } = useSelector(state => state)

    useEffect(() => {
        const pathname = window.location.pathname
        const text = getInitialText(lang, [pathname])
        dispatch(setTextPathName(pathname))
        dispatch(initText(text))
    },[])


    if(!header){
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