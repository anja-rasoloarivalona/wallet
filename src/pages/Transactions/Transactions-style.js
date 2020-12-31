import styled from 'styled-components'


const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: calc(100vh - 7.5rem);
    background: ${props => props.theme.clr_background};
    padding-left: 35rem;
    padding-top: 3rem;
    display: flex;
    justify-content: center;
`

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-width: 90rem;
    // background: red;

    * {
        font-size: 1.4rem;
    }
`

const TableHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    // background: green;
    padding-bottom: 2rem;
    border-bottom: 1px solid grey;
`

const TableHeaderItem = styled.div`
    width: 100%;
`


const TableRow = styled.div`
    display: flex;
    align-items: center
    width: 100%;
    padding: 1.5rem 0;
    position: relative;
`

const TableRowItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

const Cta = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
`

export {
    Container,
    Table,
    TableHeader,
    TableHeaderItem,
    TableRow,
    TableRowItem,
    Cta
}