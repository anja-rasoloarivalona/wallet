import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Dashboard from '../pages/Dashboard/Dashboard'
import { getInitialText } from '../translations'
import * as actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

const Routes = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { initText } = actions
    const { lang } = useSelector(state => state.settings)

    useEffect(() => {
        const currentPage = location.pathname.substring(1)
        const text = getInitialText(lang, [currentPage])
        dispatch(initText(text))
    }, [lang, location.pathname])



    return (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Redirect to="/"/>
            </Switch>
    )
}


export default Routes