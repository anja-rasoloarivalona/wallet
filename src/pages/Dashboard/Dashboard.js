import React, { useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import { useSelector } from 'react-redux'
import { Container, GridContainer,  GridItem } from './Dashboard-style'
import { Balance, MonthlyExpenses, MonthlyIncomes, ComparedToLastMonth, Expenses, Budget } from './items'


const Dashboard = props => {
    const { token } = useSelector(state => state.user)

    const layout = [
        { w: 4, h: 3, x: 0, y: 0, i: "balance", Component: Balance },
        { w: 4, h: 3, x: 4, y: 3, i: "monthly-expenses", Component: MonthlyExpenses },
        { w: 4, h: 3, x: 0, y: 3, i: "monthly-incomes", Component: MonthlyIncomes },
        { w: 4, h: 3, x: 4, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth },
        { w: 4, h: 6, x: 8, y: 0, i: "expenses", Component: Expenses },
        { w: 8, h: 6, x: 0, y: 6, i: "budget", Component: Budget }
    ];

      const renderItem = item => {
          const { Component } = item
          return (
              <GridItem key={item.i}>
                  <Component />
              </GridItem>
          )
      }

      useEffect(() => {
        if(!token){
            // props.history.push("/login")
        }
      },[])

      

    return (
        <Container>
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={34}
                    width={1080}
                    onDragStop={(data) => console.log(data)}
                    margin={[20, 10]}
                >   
                    {layout.map(item => renderItem(item))}
                </GridLayout>
            </GridContainer>
        </Container>
    )
}

export default Dashboard
