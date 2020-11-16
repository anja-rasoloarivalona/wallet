import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Dashboard from '../pages/Dashboard/Dashboard'

const routes = () => {

    return (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                {/* <Redirect to="/"/> */}
            </Switch>
    )
}


export default routes