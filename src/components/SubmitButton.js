import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Loader } from './Loader'

const Container = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const SubmitButton = props => {
    const { isSubmitting, label, onClick, onCancel } = props
    return (
        <Container>
            {isSubmitting ?
                <Loader /> :
                <>  
                    {onCancel && (
                        <Button
                            onClick={onCancel}
                            type="button"
                            secondary
                        >
                            Cancel
                         </Button>
                    )}
                    <Button onClick={onClick} type="submit">
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