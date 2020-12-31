import React, { useState } from 'react'
import { Item , Title } from '../Dashboard-style'
import { useSelector } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'
import { Amount } from '../../../components'

const Expenses = () => {

    const { 
        settings: { lang },
        user: { transactions },
        categories: { expense },
        text: { currentPage: text }
    } = useSelector(state => state)

    
    const expensesData = []
    const expensesBackgroundColor = []
    const expensesLabels = []

    let total = 0

    const tempData = {}
    if(transactions && transactions.length > 0){
        transactions.forEach(transaction => {
            if(transaction.type === "expense"){
                if(!tempData[transaction.category.master_name]){
                    tempData[transaction.category.master_name] = parseInt(transaction.amount)
                } else {
                    tempData[transaction.category.master_name] += parseInt(transaction.amount)
                }
    
                total += parseInt(transaction.amount)
            }
        })
    }


    Object.keys(tempData).forEach(item => {
        expensesData.push(tempData[item])
        expensesBackgroundColor.push(expense[item].color)
        expensesLabels.push(text[item])
    })


    const data = {
        datasets: [ { data: expensesData , backgroundColor: expensesBackgroundColor } ],
        labels: expensesLabels
    }

    console.log(data.datasets[0])

    const ChartContainer = styled.div`
        position: relative;
        width: 100%;
        height: 90%;
        padding: 1rem;
        // background: orangered;
        // border-radius: 50%;

        canvas {
            height: 100%;
        }
    `

    const Total = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: -1;
        margin: auto;
        background: ${ props => props.theme.grey_light};
        border-radius: 50%;
        width: 9em;
        height: 9em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
    `

    const test = (e, array) => {
        console.log(array[0])
    }

    return (
        <Item>
            <Title>Expenses</Title>
            <ChartContainer>
                <Doughnut 
                    data = {data}
                    options={{
                        maintainAspectRatio: false,
                        onClick: (e, arr) => test(e, arr),
                        cutoutPercentage: 80,
                        legend: {
                            display: false
                        },
                    }}
                />
                <Total>
                    <Amount value={total}/>
                </Total>
            </ChartContainer>
        </Item>
    )
}

export default Expenses