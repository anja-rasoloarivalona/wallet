import React from 'react'
import { Container, Table, TableHeader, TableHeaderItem, TableRow, TableRowItem, Cta } from './TransactionsTable-style'
import { useSelector } from 'react-redux'
import { CategoryLabel } from '../../components/Form/custom/CategoryInput-style'
import { AppDate, Amount } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const config = {
    date: "10%",
    type: "10%",
    category: "30%",
    asset: "15%",
    counterparty: "20%",
    amount: "15%"
}

const TransactionsTable = props => {

    const {
        text: { currentPage: text}
    } = useSelector(state => state)


    const headerItems = [
        {id: "date", label: "Date"},
        {id: "type", label: "Type"},
        {id: "category", label: text.category},
        {id: "asset", label: text.asset},
        {id: "counterparty", label: text.counterparty},
        {id: "amount", label: text.amount}
    ]
    const renderHeaderItem = item => {
        return (
            <TableHeaderItem
                key={item.id}
                width={config[item.id]}
            >
                {item.label}
            </TableHeaderItem>
        )
    }

    const renderTransaction = (transaction, index) => {
        const odd = Math.abs(index % 2) === 1;
        const { id, type, date, counterparty, amount, asset, category: { master_name  } } = transaction
        return (
            <TableRow key={id}>
                <TableRowItem width={config.date}>
                    <AppDate 
                        value={date}
                        format="dd mm"
                        month="short"
                    />
                </TableRowItem>
                <TableRowItem width={config.type}>{`${text[type]}`}</TableRowItem>
                <TableRowItem width={config.category}>
                    <CategoryLabel 
                        item={transaction.category}
                        type="sub"
                    />
                </TableRowItem>
                <TableRowItem width={config.asset}>{`${text[asset.type]} - ${asset.name}`}</TableRowItem>
                <TableRowItem width={config.counterparty}>{counterparty}</TableRowItem>
                <TableRowItem width={config.amount}>
                    <Amount value={amount} />
                </TableRowItem>
                <Cta>
                   <FontAwesomeIcon 
                        icon="ellipsis-v"
                        size="1x"
                        color="grey"
                   />
                </Cta>
            </TableRow>
        )
    }


    return (
        <Container>
            <Table>
                <TableHeader>
                    {headerItems.map(renderHeaderItem)}
                </TableHeader>
                {props.transactions &&  props.transactions.map((transaction, index) => renderTransaction(transaction, index))}
            </Table>
            
        </Container>
    )
}

export default TransactionsTable