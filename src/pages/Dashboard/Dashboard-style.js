import styled from 'styled-components'


const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding-left: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.theme.background};
    position: relative;
    z-index: 2;

    overflow-x: hidden;

    @media (max-width: 767px){
        padding-left: 0rem;
    }
    
`
const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .layout {
        width: 100%;
    }
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    border-radius: 1.5rem;
    box-shadow: ${props => props.theme.box_shadow};

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }
`

const Item = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    border-radius: 1.5rem;

    .dashboard_amount {
        font-size: 1.8rem;
    }
`


const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: .8rem;
    color: ${props => props.theme.text_light};
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