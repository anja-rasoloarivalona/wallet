import React from 'react'
import { Container, LoginForm } from './Login-style'
import { withFormik } from 'formik'
import { renderInput } from '../../functions/form'
import { Button } from '../../components'

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue } = props

    const inputs = [
        {   
            id: "email",
            type: "email",
            name: "email",
            label: "Email",
            placeholder: "Email",
            input_type: "input",
        },
        {   
            id: "password",
            type: "password",
            name: "password",
            label: "Password",
            placeholder: "Password",
            input_type: "input",
        }
    ]
    return (
        <LoginForm>
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
                Login
            </Button>
        </LoginForm>
    )
}

const EnhancedForm = withFormik({
    mapPropsToValues: props => {
        return {
            email: '',
            password: '',
        }
    },
})(Form)


const Login = () => {
    return (
        <Container>
            <EnhancedForm />
        </Container>
    )
}

export default Login
