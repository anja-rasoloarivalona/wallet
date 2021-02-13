import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Loader } from './Loader'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    ${props => {
        if(props.submitButtonStyle === "full"){
            return {
                justifyContent: "space-between",
                "button": {
                    width: "100% !important",
                    margin: "0",
                    "&:first-child": {
                        marginRight: "1rem"
                    }
                }
            }
        }
    }}
`

const SubmitButton = props => {

    const {
        text: { currentPage: text }
    } = useSelector(state => state)

    const { isSubmitting, label,cancelLabel, onClick, onCancel, submitButtonStyle } = props
    return (
        <Container submitButtonStyle={submitButtonStyle}>
            {isSubmitting ?
                <Loader /> :
                <>  
                    {onCancel && (
                        <Button
                            onClick={onCancel}
                            type="button"
                            secondary
                            square
                        >
                           {cancelLabel ? cancelLabel : text.cancel }
                         </Button>
                    )}
                    <Button onClick={onClick} type="submit"  square>
                        {label}
                    </Button>
                </>
            }
        </Container>
    )
}


export {
    SubmitButton
}