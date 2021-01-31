import styled from 'styled-components'

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: 100vw;
    background: ${props => props.theme.clr_background};
    display: flex;
    padding-left: 7rem;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    padding: 3rem 0;
    font-size: 3rem;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    
    margin-right: 5rem;
`

export {
    Container, 
    Title,
    Content
}