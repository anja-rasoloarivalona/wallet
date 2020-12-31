import React, { useState, useEffect } from 'react'
import { Item , Title } from '../Dashboard-style'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { setDate } from '../../../functions'


const ChartContainer = styled.div`
position: relative;
width: 100%;
height: 90%;
`

const History = () => {

    const { 
        budget,
        categories : { expense },
        user: { transactions, assets },
        theme,
        settings
    } = useSelector(state => state)


    let initialBalance = 0
    assets.forEach(asset => {
        initialBalance += parseInt(asset.amount)
    })

    let currentBalance = initialBalance

    const data = []
    const dayLength = 24*60*60*1000

    for(let i = 0; i <= 30; i++){
        const date = new Date(Date.now() - (i * dayLength ))
        const shortDate = setDate(date, "dd-mm", "en")
        data.push({
            income: 0,
            expense: 0,
            index: i,
            shortDate,
            date,
        })
    }

    if(transactions){
        transactions.forEach(transaction => {
            const amount = parseInt(transaction.amount)
            const shortDate = setDate(transaction.date, "dd-mm", "en")
            const indexHos = data.findIndex( i => i.shortDate === shortDate)
            if(indexHos){
                data[indexHos][transaction.type] = data[indexHos][transaction.type] + amount
            }
        })
    }




    data.forEach((item, index) => {
        const variation = item.income - item.expense
        data[index].variation = variation

        if(data[index + 1]){
            data[index + 1].balance = currentBalance - variation
        }
        currentBalance -= variation
    })

    data[0].balance = initialBalance

    
    const chartData = {
        labels: [],
        datasets: [{
            data: [],
            background: "red"
        }]
    }

    const inputData = data.reverse()

    inputData.forEach(item => {
        chartData.labels.push(item.shortDate)
        chartData.datasets[0].data.push(item.balance)
    })




    console.log(data)



    const options = {

    }



    return (
        <Item>
            <Title>Budget Remaining</Title>
            <ChartContainer>
                <Line data={chartData} options={options}/>
            </ChartContainer>
      
        </Item>
    )
}

export default History