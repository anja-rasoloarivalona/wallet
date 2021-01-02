import styled from 'styled-components'


const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding-top: 10rem;
    padding-left: 1rem;
    display: flex;
    justify-content: center;
    background: ${props => props.theme.background};
    position: relative;
    z-index: 2;
    min-height: 100vh;
`

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: min-content;
    background: ${props => props.theme.surface};

    * {
        font-size: 1.4rem;
    }
`

const TableHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 3px solid ${props => props.theme.background};
    padding: 2rem 6rem 2rem 6rem;

    > div:nth-child(1) {
        width: 10%;
        // background: red;
    }

    > div:nth-child(2) {
        width: 10%;
        // background: salmon;
    }
    > div:nth-child(3) {
        width: 30%;
        // background: orange;
    }
    > div:nth-child(4) {
        width: 15%;
        // background: violet;
    }
    > div:nth-child(5) {
        width: 20%;
        // background: brown;
    }
    > div:nth-child(6) {
        width: 15%;
        // background: grey;
        justify-content: flex-end;
    }
`

const TableHeaderItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;


`


const TableRow = styled.div`
    display: flex;
    align-items: center
    width: 100%;
    padding: 1.5rem 6rem 1.5rem 6rem;
    position: relative;
    background: ${props => props.odd ? props.theme.background :  props.theme.surface};

    > div:nth-child(1) {
        width: 10%;
        // background: red;
    }

    > div:nth-child(2) {
        width: 10%;
        // background: salmon;
    }
    > div:nth-child(3) {
        width: 30%;
        // background: orange;
    }
    > div:nth-child(4) {
        width: 15%;
        // background: violet;
    }
    > div:nth-child(5) {
        width: 20%;
        // background: brown;
    }
    > div:nth-child(6) {
        width: 15%;
        // background: grey;
        justify-content: flex-end;
    }


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