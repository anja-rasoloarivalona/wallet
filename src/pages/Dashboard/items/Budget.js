import React from 'react'
import { Item , Title, Amount} from '../Dashboard-style'
import { renderAmount } from '../../../functions'
import { useSelector } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2'
import styled from 'styled-components'

const Budget = () => {

    const { 
        budget,
        categories : { expense },
        theme,
        settings
    } = useSelector(state => state)

    const amountData = {
        label: "Amount",
        data: [],
        backgroundColor: [],
        borderWidth: 2,
        fill: true,
    }

    const usedData = {
        label: "Used",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
    }

    const data = {
        labels: [],
        datasets: [usedData, amountData ]
    }

    budget.data.forEach(item  => {
        data.labels.push(expense[item.category.master_name].children[item.category.sub_name].sub_name)
        amountData.data.push(item.amount)
        amountData.backgroundColor.push(theme.grey_light)
        usedData.data.push(item.used)
        usedData.backgroundColor.push(expense[item.category.master_name].color)
    })

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        barRoundness: 1,
        scales: {
            yAxes: [{
                stacked: true,
                barThickness: 16,
                minBarLength: 2,
            }],
            xAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return value + settings.currency.symbol;
                    },
                },
            }]
    
        }
    }

    const Test = styled.div`
        position: relative;
        width: 100%;
        height: 90%;
        // background: blue;
    `

    return (
        <Item>
            <Title>Budget</Title>
            <Test>
                <HorizontalBar data={data} options={options}/>
            </Test>
      
        </Item>
    )
}

export default Budget