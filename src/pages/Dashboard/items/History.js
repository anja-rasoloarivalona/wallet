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
        settings,
        text: { currentPage: text}
    } = useSelector(state => state)


    const test = canvas => {

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
            let label = ""
    
            if(i === 30){
                label = setDate(date, "mm dd", "en", "short")
            } else {
                label = shortDate
            }
    
            data.push({
                income: 0,
                expense: 0,
                index: i,
                shortDate,
                date,
                label
            })
        }
    
        if(transactions){
            transactions.forEach(transaction => {
                const amount = parseInt(transaction.amount)
                const shortDate = setDate(transaction.date, "dd-mm", "en")
                const indexHos = data.findIndex( i => i.shortDate === shortDate)
                if(indexHos > -1){
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


        const ctx = canvas.getContext("2d");
        var gradient = ctx .createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, theme.gradient(0.5));
        gradient.addColorStop(0.5, theme.gradient(0.25));
        gradient.addColorStop(1, theme.gradient(0));

        const chartData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: gradient,
                    label: text.balance_variation,
                    lineTension: 0
                    
                }
            ]
        }
    
        const inputData = data.reverse()
    
        inputData.forEach(item => {
            chartData.labels.push(item.label)
            chartData.datasets[0].data.push(item.balance)
        })

        return chartData

    }


  

    const options = {
        type: 'line',
        tooltips: {
            mode: "x-axis"
        },
        elements: {
            point:{
                radius: 0
            }
        },
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 15
                },
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                ticks: {
                    precision: 0,
                    maxTicksLimit: 6
                },
                afterUpdate: function(value){
                    console.log({
                        value
                    })
                },
                gridLines: {
                  drawBorder: false,
                },
            }]
        },
        layout: {
        },
 
    }



    return (
        <Item>
            <Title>{text.balance_variation}</Title>
            <ChartContainer>
                <Line data={test} options={options} />
            </ChartContainer>
      
        </Item>
    )
}

export default History