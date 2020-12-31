import styled from 'styled-components'


const Container = styled.div`
    grid-column: 1 / -1;
    width: calc(100vw - 35rem);
    // min-height: calc(100vh - 7.5rem);
    background: ${props => props.theme.clr_background};
    margin-left: 35rem;
    padding-top: 3rem;
    display: flex;
    justify-content: center;
`
const GridContainer = styled.div`
    width: 100%;
    display: flex;
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);

    .react-grid-item.react-grid-placeholder {
        background-color: green !important;
        background: green !important;

      }

      .react-grid-item:not(.react-grid-placeholder) {
        background-color: green !important;
        border: 1px solid black;
    }
`


const Item = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
`


const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: .8rem;
`

const Amount = styled.div`
    font-size: 2.5rem;
    font-weight: 600;
`


export {
    Container,
    GridContainer,
    GridItem,
    Item,
    Amount,
    Title
}