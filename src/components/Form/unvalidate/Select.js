import React from 'react'
import { Container, SelectInput, Label } from '../style'

const Select = props => {
    const {input, currentValue } = props

    
    const handleChange = option => {
        props.onChange(option.value)
    }
    
    return (
        <Container key={input.id}  style={input.containerStyle ? {...input.containerStyle} : {}}>
            {input.label && (
                <Label
                    shown={currentValue !== ""}
                    style={input.labelStyle ? {...input.labelStyle} : {}}
                >
                    {input.label}
                </Label>
            )}
            <SelectInput 
                input={input}
                onChange={handleChange}
                currentValue={currentValue}
            />
        </Container>
    )
}

export  {
    Select
}