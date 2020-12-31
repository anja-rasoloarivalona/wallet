import React, { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import { useSelector } from 'react-redux'
import { Container, GridContainer,  GridItem } from './Dashboard-style'
import {History, Transactions, Balance, MonthlyExpenses, MonthlyIncomes, ComparedToLastMonth, Expenses, Budget, Assets } from './items'


const Dashboard = props => {
    const {
        token,
        assets
    } = useSelector(state => state.user)

    const layout = [
        { w: 6, h: 8, x: 0, y: 3, i: "history", Component: History },
        { w: 4, h: 3, x: 0, y: 0, i: "balance", Component: Balance },
        { w: 4, h: 3, x: 4, y: 3, i: "monthly-expenses", Component: MonthlyExpenses },
        { w: 4, h: 3, x: 0, y: 3, i: "monthly-incomes", Component: MonthlyIncomes },
        { w: 4, h: 3, x: 4, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth },
        { w: 4, h: 6, x: 8, y: 0, i: "expenses", Component: Expenses },
        { w: 8, h: 6, x: 0, y: 6, i: "budget", Component: Budget },
        { w: 6, h: 8, x: 0, y: 3, i: "transactions", Component: Transactions },

    ];

    if(assets){
        assets.forEach((asset, index) => {
            const yData = 6 * (index + 1)
            layout.push({
                w: 4, h: 4, x: 8, y: yData, i: `${asset.id}-assets`, Component: () => <Assets asset={asset} /> 
            })
        })
    }



      const renderItem = item => {
          const { Component } = item
          return (
              <GridItem key={item.i}>
                  <Component />
              </GridItem>
          )
      }

      useEffect(() => {
        //   console.log("mounted", token)
        if(!token){
            props.history.push("/login")
        }
      },[])

      if(!token){
          return <div></div>
      }


      const dashboardwidth = window.innerWidth - 385


      

    return (
        <Container>
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={34}
                    width={dashboardwidth}
                    onDragStop={(data) => console.log(data)}
                    margin={[15, 15]}
                >   
                    {layout.map(item => renderItem(item))}
                </GridLayout>
            </GridContainer>
        </Container>
    )
}

export default Dashboard
