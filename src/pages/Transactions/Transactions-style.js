import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../components'

const AddTransactionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 2rem;
    width: 90%;
`

const AddTransaction = styled(Button)`
    background: #1d8d1d;
    min-width: unset;
    padding: 2rem;
    margin: 0;
`

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding-top: 6rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: ${props => props.theme.background};
    position: relative;
    z-index: 2;
    min-height: calc(100vh - 5.4rem);

    @media screen and (max-width: 767px){
        padding-top: 2rem;
        padding-left: 0;
    }
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
    color: ${props => props.theme.text};

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

    @media screen and (max-width: 767px){
        > div:nth-child(1) {
            width: 30%;
        }
        > div:nth-child(2) {
            display: none;
        }
        > div:nth-child(1) {
            width: 30%;
        }
        > div:nth-child(4) {
            display: none;
        }
        > div:nth-child(5) {
            display: none;
        }
        > div:nth-child(6) {
            width: 40%;
        }
    }
`

const TableHeaderItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
`


const TableRow = styled.div`
    display: flex;
    align-items: center
    width: 100%;
    padding: 1.5rem 6rem 1.5rem 6rem;
    position: relative;
    background: ${props => props.odd ? props.theme.background :  props.theme.surface};
    color: ${props => props.theme.text};

    > div:nth-child(1) {
        width: 10%;
    }

    > div:nth-child(2) {
        width: 10%;
    }
    > div:nth-child(3) {
        width: 30%;
    }
    > div:nth-child(4) {
        width: 15%;
    }
    > div:nth-child(5) {
        width: 20%;
    }
    > div:nth-child(6) {
        width: 15%;
        justify-content: flex-end;
        color: ${props => props.theme.active_text};
    };


    @media screen and (max-width: 767px){
        > div:nth-child(1) {
            width: 30%;
        }
        > div:nth-child(2) {
            display: none;
        }
        > div:nth-child(1) {
            width: 30%;
        }
        > div:nth-child(4) {
            display: none;
        }
        > div:nth-child(5) {
            display: none;
        }
        > div:nth-child(6) {
            width: 40%;
        }
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

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: min-content;


    ul {
        background: ${props => props.theme.background};
        width: 20rem;
        height: max-content;
        left: 0;
        top: calc(100% + 1.3rem);
    }
`

const Icon = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-left: 3rem;

    ${props => {
        if(props.active){
            return {
                color: props.theme.active_text
            }
        }
    }}
`

export {
    Container,
    Table,
    TableHeader,
    TableHeaderItem,
    TableRow,
    TableRowItem,
    Cta,
    FilterContainer,
    Icon,
    AddTransaction,
    AddTransactionContainer
}