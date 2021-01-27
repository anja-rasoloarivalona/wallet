import React, { useEffect } from 'react'
import { withFormik, Form as FormComponent } from 'formik'
import { renderInput } from '../functions'
import { SubmitButton  } from '../components'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

const formFunctions = {}
let errorText = {}

const Form = props => {
    const { inputs, errors, touched, handleChange, values, handleBlur, setFieldValue, isSubmitting, setErrors, getValues, getErrors } = props
    
    formFunctions.setErrors = setErrors
    errorText = useSelector(state => state.text.errors)

    useEffect(() => {
        if(getValues){
            getValues(values)
        }
    },[values])

    useEffect(() => {
        if(getErrors){
            getErrors(errors)
        }
    },[errors])


    return (
        <FormComponent>
            {inputs && inputs.map((input, index) => renderInput({
                input,
                index,
                errors,
                touched,
                handleChange,
                values,
                onBlur: handleBlur,
                onChange: setFieldValue
            }))}
            {props.children}
            <SubmitButton 
                isSubmitting={isSubmitting}
                label={props.buttonLabel}
                onClick={props.onClickButton}
            />
        </FormComponent>
    )
}

const EnhancedForm = withFormik({
    mapPropsToValues: ( { inputs } ) => {
        const values = {}
        inputs && inputs.forEach(input => {
            values[input.name] = ""
        })
        return values
    },
    validationSchema: ({ inputs }) => {
        const validations = {}
        inputs && inputs.forEach(input => {
            if(input.validation){
                validations[input.name] = input.validation
            }
        })
        return Yup.object().shape(validations)
    },
    handleSubmit: async (values, {props, setErrors }) => {
        const empty = errorText.required_field
        const { submitHandler } = props
        let isValid = true
        const errors = {}
        for(const value in values){
            if(values[value].length === 0){
                isValid = false
                errors[value] = empty
            }
        }
        if(isValid){
            await submitHandler(values)
        } else {
            setErrors(errors)
        }
    }
})(Form)


export {
    EnhancedForm,
    formFunctions
}
