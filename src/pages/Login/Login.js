import React from 'react'
import { Container, LoginForm } from './Login-style'
import { withFormik } from 'formik'
import { renderInput } from '../../functions/form'
import { Button } from '../../components'
import { useSelector } from 'react-redux'

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
