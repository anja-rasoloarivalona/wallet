import React, { useEffect } from 'react'
import { Container, LoginForm, Title } from './Login-style'
import { withFormik } from 'formik'
import { renderInput } from '../../functions'
import * as Yup from 'yup'
import { Button } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { client } from '../../functions'

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue } = props
    const { currentPage :  text } = useSelector(state => state.text)

    const inputs = [
        {   
            id: "email",
            type: "email",
            name: "email",
            label: text.email,
            placeholder: text.email,
            input_type: "input",
        },
        {   
            id: "password",
            type: "password",
            name: "password",
            label: text.password,
            placeholder: text.password,
            input_type: "input",
        }
    ]
    return (
        <LoginForm>
            <Title>
                {text.login}
            </Title>
            {inputs.map((input, index) => renderInput({
                input,
                index,
                errors,
                touched,
                handleChange,
                values,
                onBlur: handleBlur,
                onChange: setFieldValue
            }))}
            <Button type="submit" primary>
                {text.login}
            </Button>
        </LoginForm>
    )
}

const EnhancedForm = withFormik({
    mapPropsToValues: () => {
        return {
            email: '',
            password: '',
        }
    },
    validationSchema: ({ text }) => {
        const empty = text.errors.required_field
        return Yup.object().shape({
            email: Yup.string().required(empty).email(text.errors.email_invalid),
            password: Yup.string().required(empty)
         })
    },
    handleSubmit: async (values, {props}) => {
        const { loginHandler } = props
        loginHandler(values)
    }
})(Form)


const Login = props  => {

    const dispatch = useDispatch()
    const { 
        text,
        user : { token }
    } = useSelector(state => state)


    useEffect(() => {
        if(token){
            props.history.push("/")
        }
    },[token])

    const loginHandler = async data => {
        try {
            const res = await client.post("/login", data)
            if(res.status === 200){
                const resData = res.data.data
                const data = {
                    ...resData.userData,
                    token: resData.token
                }
                dispatch(actions.updateApp(data))
            } else {
                dispatch(actions.clearUser())
            }
        } catch(err){
            console.log(err.message)
            dispatch(actions.clearUser())
        }
    }

    if(token){
        return <div></div>
    }

    return (
        <Container>
            <EnhancedForm
                loginHandler={loginHandler}
                text={text}
            />
        </Container>
    )
}

export default Login
