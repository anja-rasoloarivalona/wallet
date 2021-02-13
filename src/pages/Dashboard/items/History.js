import React, { useState, useEffect } from 'react'
import { Item , Title } from '../Dashboard-style'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { setDate } from '../../../functions'
import { ScrollDrag } from '../../../components'


const ChartContainer = styled.div`
    position: relative;
    width: 80vw;
    height: 90%;
`

const FixedYAxis = styled.div`
    position: absolute;
    left: 2rem;
    bottom: 6.8rem;
    top: 7.8rem;
    margin: auto;
    height: calc(100% - 13.4rem);
    width: 4rem;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    background: white;
    z-index: 2;

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        right: -4px;
        width: 6.5rem;
        height: 3rem;
        background: white;
    }

`

const FixedYAxisLabel = styled.div`
    font-size: 1.2rem;
`

const History = () => {

    const [yLabels, setYlabels] = useState([])

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
        var gradient = ctx .createLinearGradient(0, 0, 0, 140);
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


    useEffect(() => {
        console.log({
            yLabels
        })
    },[yLabels])

 


  

    const options = {
        type: 'line',
        tooltips: {
            mode: "x-axis"
        },
        legend: {
            display: false
         },
        elements: {
            point:{
                radius: 0
            }
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                },
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                ticks: {
                    precision: 0,
                    maxTicksLimit: 6,
                    min: 4000,
                    max: 6000
                },
                afterUpdate: function(value){
                    let mustUpdate = false
                    value.ticksAsNumbers.forEach((tick, index) => {
                        if(tick !== yLabels[index]){
                            mustUpdate = true
                        }
                    })

                    if(mustUpdate){
                        setYlabels(value.ticksAsNumbers)
                    }

           
                },
                gridLines: {
                  drawBorder: false,
                },
            }]
        },
        layout: {
        }
    }



    return (
        <Item>
            <Title>{text.balance_variation}</Title>
            <ScrollDrag style={{height: "95%", paddingTop: "2.5rem"}}>
                {yLabels.length > 0 && (
                        <FixedYAxis>
                            {yLabels.map(label => (<FixedYAxisLabel key={label} length={yLabels.length}>{label}</FixedYAxisLabel>))}
                        </FixedYAxis>
                )}
                <ChartContainer>
                    <Line data={test} options={options} />
                </ChartContainer>
            </ScrollDrag>
        </Item>
    )
}

export default History