import styled from 'styled-components'


const SectionContainer = styled.div`
    padding-right: 7rem;
    height: calc(100vh - 7rem);
    overflow-y: overlay;
    padding-top: 3.5rem;
    margin-bottom: .5rem;
`



const Section = styled.div`
    width: 50vw;
    max-width: 50rem;
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
    font-size: 1.4rem;
`

const Text = styled.div`
    line-height: 1.4;
`



export {
    SectionContainer,
    Section,
    Title,
    TextContainer,
    Text
}