import styled from 'styled-components'


const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding-top: 9rem;
    padding-left: 2rem;
    display: flex;
    justify-content: center;
    background: ${props => props.theme.background};
    position: relative;
    z-index: 2;
`
const GridContainer = styled.div`
    width: 100%;
    display: flex;
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    border-radius: 1.5rem;
    box-shadow: ${props => props.theme.box_shadow};
    // z-index: -1 !important;


    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }
`

const Item = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    // z-index: -1 !important;


    .dashboard_amount {
        font-size: 1.8rem;
    }
`


const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: .8rem;
    color: ${props => props.theme.active_text}
`

const HiddenButton = styled.button`
    display: none;
`

export {
    Container,
    GridContainer,
    GridItem,
    Item,
    Title,
    HiddenButton,
}