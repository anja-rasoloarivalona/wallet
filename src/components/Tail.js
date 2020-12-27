import styled from 'styled-components'


const TailContainer = styled.div`
    position: absolute;
    left: calc(100% + 1rem);
    top: 0;
    bottom: 0;
    margin: auto;
    background: ${props => props.type === "information" ? props.theme.clr_surface : props.theme.red};
    width: max-content;
    max-width: 30rem;
    height: max-content;
    border: 1px solid ${props => props.type === "information" ? props.theme.clr_surface : props.theme.red};
    border-radius: 4px;
    color: ${props =>  props.theme.white};
    z-index: 5;

    &::before {
        content: '';
        position: absolute;
        margin: auto;
        left: -1.5rem;
        top: 0rem;
        bottom: 0rem;
        width: 1.5rem;
        height: 1.5rem;
        background: inherit;
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }

    ${props => {
        if(props.style){
            return props.style
        }
    }}

    @media (max-width: ${props => props.bottom}) {
       left: 0;
       top: calc(100% + 1.5rem);
       bottom: unset;

       &::before {
            position: absolute;
            margin: auto;
            left: 1rem;
            top: -1.5rem;
            clip-path: polygon(100% 100%, 50% 0, 0 100%);
        }
    }

   


`

const TailText = styled.div`
      padding: 1rem;
`

const Tail = props => {
    const { bottom, children, type, style } = props

    return (
        <TailContainer bottom={bottom} type={type} style={style}>
           <TailText>{children}</TailText>
        </TailContainer>
    )
}

export {
    Tail
}
