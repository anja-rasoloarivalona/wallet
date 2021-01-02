import React from 'react'
import { Container , Table, TableHeader, TableHeaderItem, TableRow, TableRowItem, Cta } from './Transactions-style'
import { useSelector, useDispatch } from 'react-redux'
import { setDate } from '../../functions'
import { RenderLabel } from '../../functions/form'
import { Amount } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../../store/actions'

const  Transactions = () => {

    const dispatch = useDispatch()

    const {
        user : { transactions },
        settings: { lang },
        text: { currentPage: text},
        categories
    } = useSelector(state => state)

    const header = [
        {label: "Date"},
        {label: "Type"},
        {label: "Category"},
        {label: "Asset"},
        {label: "Counterparty"},
        {label: "Amount"}
    ]

    const renderHeaderItem = item => {
        return (
            <TableHeaderItem key={item.label}>
                    {item.label}
            </TableHeaderItem>
        )
    }

    const editTransaction = (transaction, index) => {
        dispatch(actions.toggleForm({
            action: "edit",
            form: "transactionForm",
            edited: {
                ...transaction,
                index
            }
        }))
    }

    const renderTransaction = (transaction, index) => {
        const odd = Math.abs(index % 2) === 1;
        const { id, type, date, counterparty, amount, asset, category: { master_name  } } = transaction
        return (
            <TableRow key={id} onClick={() => editTransaction(transaction, index)} odd={odd}>
                <TableRowItem>{setDate(date, "dd-mm", lang, "short")}</TableRowItem>
                <TableRowItem>{`${text[type]}`}</TableRowItem>
                <TableRowItem>
                    <RenderLabel 
                        item={transaction.category}
                        type="sub"
                    />
                </TableRowItem>
                <TableRowItem>{`${text[asset.type]} - ${asset.name}`}</TableRowItem>
                <TableRowItem>{counterparty}</TableRowItem>
                <TableRowItem>
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

    if(!transactions){
        return <div></div>
    }

    
    return (
        <Container>
               <Table>
                   <TableHeader>
                        {header.map(item => renderHeaderItem(item))}
                   </TableHeader>
                   {transactions.map((transaction, index) => renderTransaction(transaction, index))}
               </Table>
        </Container>
    )
}

export default  Transactions