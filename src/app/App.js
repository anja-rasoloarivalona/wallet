import { useEffect } from 'react'
import Config from './config'
import Header from '../elements/Header/Header'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { getInitialText } from '../translations'

const App = () => {
    const dispatch = useDispatch()
    const { text : { header }, settings : { lang } } = useSelector(state => state)

    useEffect(() => {
        const text = getInitialText(lang, [window.location.pathname])
        dispatch(actions.initText(text))
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
        </Config>
    )
}



export default App