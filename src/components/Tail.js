import styled from 'styled-components'


const TailContainer = styled.div`
    position: absolute;
    left: calc(100% + 1rem);
    top: 0;
    bottom: 0;
    margin: auto;
    background: ${props => props.theme.red};
    width: max-content;
    max-width: 30rem;
    height: max-content;
    border: 1px solid ${props => props.theme.red};
    border-radius: 4px;
    color: ${props => props.theme.white};
    z-index: 5;

    &::before {
        content: '';
        position: absolute;
        margin: auto;
        left: -1rem;
        top: 1rem;
        width: 1rem;
        height: 1rem;
        background: inherit;
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }

    @media (max-width: ${props => props.bottom}) {
       left: 0;
       top: calc(100% + 1rem);
       bottom: unset;

       &::before {
            position: absolute;
            margin: auto;
            left: 1rem;
            top: -1rem;
            clip-path: polygon(100% 100%, 50% 0, 0 100%);
        }
    }


`

const TailText = styled.div`
      padding: 1rem;
`

const Tail = props => (
    <TailContainer bottom={props.bottom}>
            <TailText>{props.children}</TailText>
    </TailContainer>
)

export {
    Tail
}
