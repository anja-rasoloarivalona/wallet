import React, { useState, useEffect } from 'react'
import {Container, Label, Error, SelectInput } from '../style'
import _ from 'lodash'

const Select = props => {
    const {input, errors, touched, values } = props
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = option => {
        props.onChange(input.name, option.value)
    }

    const handleBlur = () => {
        props.onBlur(input.name, true)
        setIsFocused(false)
    }

    useEffect(() => {
        if(input.options.length < 2 && values[input.name] === ""){
            props.onChange(input.name, input.options[0].value)
        }
    },[])

    return (
        <Container key={input.id} style={{...input.containerStyle}}>
            <Label
                htmlFor={input.id}
                style={{...input.labelStyle}}
                shown={!_.isEmpty(values[input.name]) || isFocused}
                isFocused={isFocused}
            >
                {input.label} {input.required &&  `\u002A`} 
            </Label>
            <SelectInput 
                input={input}
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                focusHandler={() => setIsFocused(true) }
            />
            {touched[input.name] && errors[input.name] && (
                <Error>
                    {errors[input.name]} 
                </Error>
            )}
        </Container>
    )
}


export {
    Select
}