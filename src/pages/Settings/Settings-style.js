import styled from 'styled-components'


const Section = styled.div`
    width: 50vw;
    max-width: 50rem;
    overflow: ${props => props.showList ? "none" : "hidden"};
    margin-bottom: 5rem;

    * {
        font-size: 1.4rem;
    }
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 2rem;
`

const TextContainer = styled.div`
    margin-bottom: 2rem;
`

const Text = styled.div`
    line-height: 1.4;
`

export {
    Section,
    Title,
    TextContainer,
    Text
}