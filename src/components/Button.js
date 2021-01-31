import styled from 'styled-components'

const Button = styled.button`
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1.4rem;
    min-width: 14rem;
    margin: 0 .5rem;

    background: ${props => props.theme.primary};
    color: ${props => props.theme.surface};
    padding: 0 7rem;
    border-radius: 2.5rem;

    ${props => {
        if(props.square){
            return {
                borderRadius: ".5rem"
            }
        }
    }}

    ${props => {
        if(props.secondary){
            return {
                background: "white",
                color: props.theme.primary,
                border: `1px solid ${props.theme.primary}`
            }
        }
    }}


    :focus {
        outline: none;
    }
`

export {
    Button
}