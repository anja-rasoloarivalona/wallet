import React, { useState, useEffect } from 'react'
import { Input } from '../../../components/form/unvalidate'
import styled from 'styled-components'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { TransactionsTable  } from '../../../elements'
import { useSelector } from 'react-redux'
import { setDate } from '../../../functions'
import _ from 'lodash'

const Container = styled.div`
    height: 5.4rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
`

const SearchContainer = styled.div`
    width: 60%;
    height: 65%;
    max-width: 40rem;
    position: relative;
    z-index: 99;
    transition: all .3s ease-in;

    ${props => {
        if(props.isFocused){
            return {
                width: "60vw",
                maxWidth: "55rem",
            }
        }
    }}
`

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transition: all .3s ease-in;
    z-index: 103;

    svg {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 2rem;
        margin: auto;
        color: ${props => props.theme.text_light};
        z-index: 101;
    }

    ${props => {
        if(props.isFocused){
            return {
                transform: "translateY(2rem)"
            }
        }
    }}
`


const Search = styled(Input)`
    background: ${props => props.theme.background};
    border-radius: 1rem;
    height: 100% !important;
    width: 100%;
    transition: all .3s ease-in;
    position: relative;
    z-index: 101;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, .5);
`
const ResultsContainer = styled.div`
    position: fixed;
    z-index: 100;
    width: 80vw;
    max-width: 90rem;
    background: ${props => props.theme.surface};
    top: 1rem;
    right: 0;
    left: 0;
    margin: auto;
    box-shadow: ${props => props.theme.box_shadow};
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    padding-top: 10rem;


`

const Results = styled.div`
    width: 100%;
    max-height: 65vh;
    min-height: 40vh;
    overflow-y: overlay;
    padding: 0 4rem;
    padding-bottom: 1rem;

    ${props => {
        if(props.displayMessage){
            return {
                minHeight: "10rem"
            }
        }
    }};

`

const Message = styled.div`
    width: 100%;
    font-size: 2rem;
    color: ${props => props.theme.primary};
    text-align: center;
`

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [transactions, setTransactions] = useState([])


    const {
        user : { transactions: _transactions },
        settings: { lang },
        text: { currentPage: text},
    } = useSelector(state => state)


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
            _transactions.forEach((transaction, index) => {
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
            setTransactions([])
        }
    },[search])

    const closeResult = () => {
        setSearch("")
        setIsFocused(false)
    }

    let isMessageDisplayed = false
    if(search === ""){
        isMessageDisplayed =  "Enter a key word"
    }
    if(search !== "" && _.isEmpty(transactions)){
        isMessageDisplayed =  "No results found"
    }

    return (
        <Container>
            {isFocused && <Background onClick={closeResult} />}
            <SearchContainer isFocused={isFocused}>
            <Content isFocused={isFocused}>
                <Search 
                        placeholder="Search ..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                    />
                    <FontAwesomeIcon 
                        icon="search"
                        size="2x"
                    />
            </Content>

                {isFocused &&  (
                    <ResultsContainer>
                        <Results displayMessage={isMessageDisplayed}>
                            {isMessageDisplayed && (
                                <Message>
                                    {isMessageDisplayed}
                                </Message>
                            )}
                            {!isMessageDisplayed && (
                                  <TransactionsTable transactions={transactions}/>
                            )}
                        </Results>
                    </ResultsContainer>
                )}
            </SearchContainer>
        </Container>
    )
}

export default SearchBar