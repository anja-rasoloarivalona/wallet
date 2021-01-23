import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import { ActivateAccount, Dashboard, ForgotPassword, Home, Login, Profile, ResetPassword, Settings, Setup, Signup, Transactions } from '../pages'
import { getInitialText } from '../translations'
import * as actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { usePrevious } from '../functions'

const Routes = props => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {
        settings : { lang, currency },
        text: { pathname, currentPage : text},
        user: { token, assets}
    } = useSelector(state => state)

    const { initText } = actions
    const prevState = usePrevious({
        lang,
        pathname
    })


    useEffect(() => {
        // if(token && currency && assets && assets.length > 0){
        //     props.history.push(`/${text.link_dashboard}`)
        // }
    },[])

    useEffect(() => {
        // if(!token){
        //     if(pathname !== "/login" && pathname !== "/signup"){
        //         props.history.push("/login")
        //     }
        // } else {
        //     if(currency && assets && assets.length > 0 && pathname === "/setup"){
        //         props.history.push("/")
        //     }
        //     if((!currency || !assets || assets.length === 0) && pathname !== "/setup"){
        //         props.history.push("/setup")
        //     }
        // }
        // if(currency && assets && assets.length > 0 && pathname === "/setup"){
        //     props.history.push("/")
        // }
        // if((!currency || !assets || assets.length === 0) && pathname !== "/setup"){
        //     props.history.push("/setup")
        // }
    },[pathname, token, currency])



    useEffect(() => {
        const pathname = location.pathname.split("/")[1]
        if(text && pathname !== ""){
            console.log({
                pathname
            })
            const currentPath =  text[`link_${pathname}`]
            if(pathname !== currentPath){
                console.log({
                    currentPath
                })
                if(currentPath !== undefined){
                    props.history.push(`/${currentPath}`)
                }
              
            }
        }
    },[text])
    

    useEffect(() => {
        let samePathname = true
        let sameLanguage = true
        if(prevState){
            if(lang !== prevState.lang){
                sameLanguage = false
            }
            if(location.pathname !== prevState.pathname){
                samePathname = false
            }
        
        }
        if(!sameLanguage || !samePathname){
            const text = getInitialText(lang, [location.pathname])
            dispatch(initText(text))
        }
  
    }, [lang, location.pathname])

    if(!token){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path={`/${text.link_login}`} component={Login}/>
                <Route path={`/${text.link_signup}`} component={Signup}/>
                <Route path={`/${text.link_signup_activate}`} component={ActivateAccount} />
                <Route path={`/${text["link_forgot-password"]}`} component={ForgotPassword} />
                <Route path={`/${text["link_reset-password"]}`} component={ResetPassword} />
                <Redirect to="/"/> 
            </Switch>
        )
    }

    return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path={`/${text.link_dashboard}`} component={Dashboard} />
                <Route path={`/${text.link_setup}`} component={Setup} />
                <Route path={`/${text.link_transactions}`} component={Transactions} />
                <Route path={`/${text.link_settings}`}  component={Settings} />
                <Route path={`/${text.link_profile}`} component={Profile} />
                <Redirect to="/"/>
            </Switch>
    )
}


export default withRouter(Routes) 