import React, { useState, useEffect, useRef } from 'react'
import { Icon, FilterContainer, Container , Table, TableHeader, TableHeaderItem, TableRow, TableRowItem, Cta } from './Transactions-style'
import { useSelector, useDispatch } from 'react-redux'
import { useOnClickOutside, usePrevious, setDate } from '../../functions'
import { RenderLabel, SelectList, SelectListItem } from '../../functions/form'
import { Amount, AppDate } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../../store/actions'
import SearchBar from './Searchbar'

const  Transactions = () => {
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        date: "down",
        type: "all"
    })
    const [search, setSearch ] = useState("")

    const prevFilters = usePrevious(filters)

    const {
        user : { transactions: _transactions },
        settings: { lang },
        text: { currentPage: text},
        categories
    } = useSelector(state => state)

    const [transactions, setTransactions] = useState(_transactions)
    const [backup, setBackup] = useState(_transactions)

    const header = [
        {label: "Date", sort: true, id: "date"},
        {   label: "Type",
            filter: true, 
            id: "type",
            options: [
                {label: text.all_m, value: "all"},
                {label: text.income, value: "income"},
                {label: text.expense, value: "expense"}
            ]
        },
        {label: text.category},
        {label: text.asset},
        {label: text.counterparty},
        {label: text.amount}
    ]

    useEffect(() => {
            if(search !== ""){
                let data = search.split(" ")
                const keys = []
                data.forEach(i => {
                    if(i !== ""){
                        keys.push(i.toLocaleLowerCase())
                    }
                })

                const res = []
                const resIndexes = []
                backup.forEach((transaction, index) => {
                    const d = [
                            setDate(transaction.date, "dd mm", lang, "short").toLowerCase(),
                            transaction.type.toLowerCase(),
                            text[transaction.category.sub_name].toLowerCase(),
                            transaction.asset.name.toLowerCase(),
                            transaction.counterparty.toLowerCase(),
                            transaction.amount.toString().toLowerCase()
                    ]
 
                    const agreggate = d.join(" ");
                    let correct = true
                    keys.forEach(key => {
                        if(!agreggate.includes(key)){
                            correct = false
                        }
                    })

                    if(correct && !resIndexes.includes(index)){
                        res.push(transaction)
                        resIndexes.push(index)
                    }
                })
                setTransactions(res)
            } else {
                setTransactions(backup)
            }
    },[search])

    useEffect(() => {
        let result = transactions.map(transaction => ({...transaction}))
        if(prevFilters){
            if(prevFilters.type !== filters.type){
                if(filters.type !== "all"){
                    result  = backup.filter(transaction => transaction.type === filters.type)
                } else {
                    result = backup.map(transaction => ({...transaction}))
                }
            }
            if(prevFilters.date !== filters.date){
                result = result.reverse()
            }
        }
        setTransactions(result)
    },[filters, backup])

    useEffect(() => {
        setTransactions(_transactions)
        setBackup(_transactions)
    },[_transactions])


    // const toggleSortDate = () => {
    //     const next = filters.date === "up" ? "down" : "up"
    //     setFilters(prev => ({ ...prev, date: next }))
    // }

    const sort = item => {
        return (
            <FilterContainer>
                {/* <Icon 
                    icon="sort"
                    size="1x"
                    onClick={toggleSortDate}
                /> */}
                <Icon 
                    icon="caret-up"
                    size="1x"
                    active={filters[item.id] === "down"}
                    onClick={() => setFilters(prev => ({ ...prev, [item.id]: "down" }))}
                />
                <Icon 
                    icon="caret-down"
                    size="1x"
                    active={filters[item.id] === "up"}
                    onClick={() => setFilters(prev => ({ ...prev, [item.id]: "up" }))}
                />
            </FilterContainer>
        )
    }


    const Filter = props => {
        const { item } = props
        const [showList, setShowlist] = useState(false)
        const ref = useRef()

        const updateFilter = value => {
            setFilters(prev => ({
                ...prev,
                [item.id]: value
            }))
            setShowlist(false)
        }

        const list = (
            <SelectList ref={ref}>
                <SelectListItem onClick={() => updateFilter("all")}>{text.all_m}</SelectListItem>
                <SelectListItem onClick={() => updateFilter("income")}>{text.income}</SelectListItem>
                <SelectListItem onClick={() => updateFilter("expense")}>{text.expense}</SelectListItem>
            </SelectList>
        )

        useOnClickOutside(ref, () => setShowlist(false))
        return (
            <FilterContainer>
                <Icon 
                    icon="filter"
                    size="1x"
                    onClick={() => setShowlist(prev => !prev)}
                />
                {showList && list}
            </FilterContainer>
        )
    }

    const renderHeaderItem = item => {
        return (
            <TableHeaderItem key={item.label}>
                {item.label}
                {item.sort && sort(item)}
                {item.filter &&  <Filter item={item}/>}
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
                <TableRowItem>
                    <AppDate 
                        value={date}
                        format="dd mm"
                        month="short"
                    />
                </TableRowItem>
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
                <SearchBar 
                    search={search}
                    setSearch={setSearch}
                />
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