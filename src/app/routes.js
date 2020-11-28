import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Dashboard from '../pages/Dashboard/Dashboard'
import ActivateAccount from '../pages/ActivateAccount/ActivateAccount'
import { getInitialText } from '../translations'
import * as actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

const Routes = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { lang } = useSelector(state => state.settings)
    const { currentPage, pathname } = useSelector(state => state.text)
    const { initText, setTextPathName } = actions


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
                <Redirect to="/"/>
            </Switch>
    )
}


export default Routes