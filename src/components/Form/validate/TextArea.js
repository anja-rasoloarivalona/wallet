import React from 'react'
import { Container, Label, Field, Error, Unit, Counter } from '../style'

const TextArea = props => {

    const { input, errors, touched, values } = props 

    return (
        <Container key={input.id} style={{...input.containerStyle}}>
            <Field 
                id={input.id}
                type={input.type}
                name={input.name}
                placeholder={input.required ? `${input.placeholder} \u002A` : input.placeholder}  
                disabled={input.disabled}
                style={{...input.fieldStyle}}
                maxLength={input.maxLength ? input.maxLength :  null}
                error={touched[input.name] && errors[input.name]}
                component="textarea"
                textarea
            />
            <Label htmlFor={input.id} style={{...input.labelStyle}}>
                {input.label} {input.required &&  `\u002A`} 
            </Label>
            {input.children && input.children()}
            {input.unit && <Unit id="unit">{input.unit}</Unit>}
            {input.maxLength && <Counter id="counter">{values[input.name].length} / {input.maxLength}</Counter>}
            {touched[input.name] && errors[input.name] && (
                <Error>{errors[input.name]}</Error>
            )}
        </Container>
    )
}

export {
    TextArea
}
