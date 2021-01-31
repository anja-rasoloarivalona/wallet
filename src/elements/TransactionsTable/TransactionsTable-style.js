import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
`

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    border-bottom: 1px solid ${props => props.theme.background};
    color: ${props => props.theme.text};
    padding-bottom: 2rem;

    > div:nth-child(6) {
        width: 15%;
        // background: grey;
        justify-content: flex-end;
        margin-right: 2rem;
    }
`

const TableHeaderItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;

    width: ${props => props.width};
`


const TableRow = styled.div`
    display: flex;
    align-items: center
    width: 100%;
    position: relative;
    background: ${props => props.odd ? props.theme.background :  props.theme.surface};
    color: ${props => props.theme.text};
    padding: 1rem 0;

    > div:nth-child(6) {
        width: 15%;
        justify-content: flex-end;
        color: ${props => props.theme.active_text};
        margin-right: 2rem;
    }



`

const TableRowItem = styled.div`
    width: ${props => props.width};
    display: flex;
    align-items: center;
`

const Cta = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0rem;
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
    Cta,
}