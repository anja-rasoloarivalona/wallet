import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import ActivateAccount from '../pages/ActivateAccount/ActivateAccount'
import Setup from '../pages/Setup/Setup'
import Dashboard from '../pages/Dashboard/Dashboard'
import { getInitialText } from '../translations'
import * as actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

const Routes = props => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { lang, currency } = useSelector(state => state.settings)
    const { pathname } = useSelector(state => state.text)
    const { token } = useSelector(state => state.user)
    const { initText, setTextPathName } = actions

    useEffect(() => {
        if(!token){
            if(pathname !== "/login" || pathname !== "/signup"){
                props.history.push("/login")
            }
        } else {
            if(currency){
                props.history.push("/")
            }
            if(!currency && pathname !== "/setup"){
                props.history.push("/setup")
            }
        }
    },[pathname, token, currency])

    useEffect(() => {
        const text = getInitialText(lang, [pathname])
        dispatch(initText(text))
    }, [lang])

    useEffect(() => {
        if(location.pathname !== pathname){
            const text = getInitialText(lang, [location.pathname ])
            dispatch(initText(text))
            dispatch(setTextPathName(location.pathname))
        }
    },[location.pathname, pathname])


    if(location.pathname !== pathname) return <div>Loading</div>


    return (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login}/>
                <Route path="/signup/activate" component={ActivateAccount} />
                <Route path="/signup" component={Signup}/>
                <Route path="/setup" component={Setup} />
                <Redirect to="/"/>
            </Switch>
    )
}


export default withRouter(Routes) 