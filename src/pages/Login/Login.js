import React from 'react'
import {Container, Modal, Title, ForgotPassword } from './Login-style'
import * as Yup from 'yup'
import { Form, formFunctions } from '../../components/form/index'
import { useSelector, useDispatch } from 'react-redux'
import {client  } from '../../functions'
import * as actions from '../../store/actions'

const Login = props => {

    const {
        text : { currentPage: text, errors: errorText },
    } = useSelector(state => state)
    const dispatch = useDispatch()

    const inputs = [
        {   
            id: "email",
            type: "email",
            name: "email",
            label: text.email,
            placeholder: text.email,
            input_type: "input",
            validation: Yup.string().email(errorText.email_invalid),
            required: true
        },
        {   
            id: "password",
            type: "password",
            name: "password",
            label: text.password,
            placeholder: text.password,
            input_type: "input",
            validation: Yup.string(),
            required: true,
            children: () => <ForgotPassword onClick={() => props.history.push(`/${text["link_forgot-password"]}`)}>
                                {text.forgot_password}
                            </ForgotPassword>
        }
    ]

    const redirectToDashboard = () => {
        props.history.push(`/${text.link_dashboard}`)
    }

    const login = async data => {
        try {
            const res = await client.post("/login", data)
            console.log({
                res
            })
            if(res.status !== 200){
                return loginFail(res)
            }
            const resData = res.data.data
            const _data = {
                ...resData.userData,
                token: resData.token
            }
            loginSuccess(_data)
        } catch(err){
            loginFail(err)
        }
    }

    const loginFail = error => {
        console.log("[FAILED TO LOGIN]", error)
        console.log(error.response)
        dispatch(actions.clearUser())
        if(error.response.status === 404){
            formFunctions.setErrors({ email: errorText.no_user_found})
        }
        if(error.response.status === 401){
            formFunctions.setErrors({ password: errorText.wrong_password})
        }
        
    }

    const loginSuccess = data => {
        dispatch(actions.updateApp(data))
        redirectToDashboard()
    }

    return (
        <Container>
            <Modal>
                <Title>{text.login}</Title>
                <Form 
                    inputs={inputs}
                    submitHandler={login}
                    buttonLabel={text.login}
                />
            </Modal>
        </Container>
       
    )
}

export default Login
