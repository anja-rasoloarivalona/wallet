import styled from 'styled-components'


const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding-top: 10rem;
    padding-left: 1rem;
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

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
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

const HiddenButton = styled.button`
    display: none;
`


export {
    Container,
    GridContainer,
    GridItem,
    Item,
    Amount,
    Title,
    HiddenButton
}