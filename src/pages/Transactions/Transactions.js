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
        {label: "Counterparty"},
        {label: "Asset"},
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
        dispatch(actions.toggleTransactionForm({
            action: "edit",
            editedTransaction: {
                ...transaction,
                index
            }
        }))
    }

    const renderTransaction = (transaction, index) => {
        const { id, type, date, counterparty, amount, asset, category: { master_name  } } = transaction
        return (
            <TableRow key={id} onClick={() => editTransaction(transaction, index)}>
                <TableRowItem>{setDate(date, "dd-mm", lang, "long")}</TableRowItem>
                <TableRowItem>{`${text[type]}`}</TableRowItem>
                <TableRowItem>
                    <RenderLabel 
                        item={transaction.category}
                        type="sub"
                        color={categories[type][master_name].color}

                    />
                </TableRowItem>
                <TableRowItem>{counterparty}</TableRowItem>
                <TableRowItem>{`${text[asset.type]} - ${asset.name}`}</TableRowItem>
                <TableRowItem>
                    <Amount value={parseInt(amount)} />
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