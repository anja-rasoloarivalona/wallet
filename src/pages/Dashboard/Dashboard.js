import React, { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import { useSelector } from 'react-redux'
import { Container, GridContainer,  GridItem } from './Dashboard-style'
import {History, Transactions, Balance, MonthlyExpenses, MonthlyIncomes, ComparedToLastMonth, Expenses, Budget, Assets } from './items'
import Header from './DashboardHeader'
import { client } from '../../functions'
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux'

const Dashboard = props => {
    const dispatch = useDispatch()
    const {
        user : { token, assets},
        ui : { sidebar, dashboard },
        settings: { dashboard: dashboard_layout}
    } = useSelector(state => state)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const components = {
        history: History,
        "monthly-expenses": MonthlyExpenses,
        "monthly-incomes": MonthlyIncomes,
        "compared-to-last-month": ComparedToLastMonth,
        expenses: Expenses,
        transactions: Transactions,
        asset: Assets,
        budget: Budget
    }

    const initial_layout = [
        { w: 12, h: 8, x: 0, y: 3, i: "history", Component: History },
        { w: 8, h: 3, x: 4, y: 3, i: "monthly-expenses", Component: MonthlyExpenses },
        { w: 8, h: 3, x: 0, y: 3, i: "monthly-incomes", Component: MonthlyIncomes },
        { w: 8, h: 3, x: 4, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth },
        { w: 8, h: 6, x: 8, y: 0, i: "expenses", Component: Expenses },
        { w: 16, h: 6, x: 0, y: 6, i: "budget", Component: Budget },
        { w: 12, h: 8, x: 0, y: 3, i: "transactions", Component: Transactions },

    ];

    if(assets){
        assets.forEach((asset, index) => {
            const yData = 6 * (index + 1)
            initial_layout.push({
                w: 8, h: 4, x: 8, y: yData, i: `${asset.id}-assets`, Component: () => <Assets asset={asset} /> 
            })
        })
    }

    const [layout, setLayout] = useState(initial_layout)

    useEffect(() => {
        if(dashboard_layout && Object.keys(dashboard_layout).length > 0 ){  
            const data = []
            for(const item in dashboard_layout){
                if(dashboard_layout[item].i.includes("assets")){

                    const asset_id = dashboard_layout[item].i.split('-')[0]
                    const asset_index = assets.findIndex(item => item.id === asset_id)

                    data.push({
                        ...dashboard_layout[item],
                        Component:  () => <Assets asset={assets[asset_index]} /> 
                    })
                    
                } else {
                    data.push({
                        ...dashboard_layout[item],
                        Component: components[dashboard_layout[item].i]
                    })
                }
         
            }
            setLayout(data)
        }
    },[dashboard_layout, sidebar])


    const renderItem = item => {
          const { Component } = item
          return (
              <GridItem
                key={item.i}
                style={{zIndex: item.i === "expenses" ? 5 : 1}}
            >
                  <Component />
              </GridItem>
          )
    }

    useEffect(() => {
        if(!token){
            props.history.push("/login")
        }
    },[])


    if(!token){
        return <div></div>
    }


    const dashboardwidth = sidebar.isShown ? window.innerWidth - 285 : window.innerWidth - 105


    let updatedLayout = []
    
    
    const saveDashboard = async () => {
        try {
            setIsSubmitting(true)
            const data = {}
            updatedLayout.forEach(item => {
                data[item.i] = item
            })
            const res = await client.post("/settings/dashboard", {data})
            const resData = res.data.data
            const dashboard = resData.dashboard
            dispatch(actions.setDashboard(dashboard))
            dispatch(actions.toggleDashboard())
            setIsSubmitting(false)
        } catch(err){
            setIsSubmitting(false)
            console.log(err.message)
        }
    }

    const stop = data => {
        updatedLayout = data
        console.log(updatedLayout)
    }

    return (
        <Container>
            <Header 
                isSubmitting={isSubmitting}
                saveDashboard={saveDashboard}
            />
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={24}
                    rowHeight={34}
                    width={dashboardwidth}
                    onDragStop={stop}
                    onResizeStop={stop}
                    margin={[15, 15]}
                    isDraggable={dashboard.isManaging}
                    isResizable={dashboard.isManaging}
                >   
                    {layout.map(item => renderItem(item))}
                </GridLayout>
            </GridContainer>
        </Container>
    )
}

export default Dashboard
