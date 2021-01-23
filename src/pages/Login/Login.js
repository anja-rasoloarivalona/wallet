import React, { useState } from 'react'
import { Container } from './Login-style'
import LoginForm from './LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { client } from '../../functions'


const Login = props  => {
    const dispatch = useDispatch()
    const [remember, setRemember] = useState(false)
    const { 
        text,
        user : { token }
    } = useSelector(state => state)

    const redirectToDashboard = () => {
        props.history.push(`/${text.currentPage.link_dashboard}`)
    }

    const loginHandler = async data => {
        try {
            const res = await client.post("/login", data)

            if(res.status !== 200){
                return loginFailedHandler(res)
            }
            const resData = res.data.data
            const _data = {
                ...resData.userData,
                token: resData.token
            }
            loginSuccessHandler(_data)
           
        } catch(err){
            loginFailedHandler(err)
        }
    }

    const loginFailedHandler = error => {
        console.log("[FAILED TO LOGIN]", error)
        dispatch(actions.clearUser())
    }

    const loginSuccessHandler = data => {
        dispatch(actions.updateApp(data))
        redirectToDashboard()
    }

    if(token){
        return redirectToDashboard()
    }

    return (
        <Container>
            <LoginForm
                loginHandler={loginHandler}
                text={text}
                remember={remember}
                setRemember={setRemember}
            />
        </Container>
    )
}

export default Login
