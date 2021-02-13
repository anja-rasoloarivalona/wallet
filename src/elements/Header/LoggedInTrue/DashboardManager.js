import React, { useState } from 'react'
import {Loader, Button as ButtonComponent } from '../../../components'
import styled from 'styled-components'
import * as actions from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { client } from '../../../functions'


const Container = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2rem;
    position: relative;
`

const Button = styled(ButtonComponent)`
    height: unset;
    min-width: unset;
    padding: 1.2rem 4rem;

    ${props => {
        if(props.secondary){
            return {
                border: "none"
            }
        }
    }}
`

const LoaderContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: rgba(0,0,0,.7);

    > div {
        bottom: 15vh;
    }
`

const DashboardManager = () => {

    const dispatch = useDispatch()
    const {
        ui : { dashboard }
    } = useSelector(state => state)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const saveDashboard = async () => {
        try {
            setIsSubmitting(true)
            const res = await client.post("/settings/dashboard", {data: dashboard.updated.layout})
            const resData = res.data.data
            const _dashboard = resData.dashboard
            dispatch(actions.setDashboard(_dashboard))
            dispatch(actions.toggleDashboard())
            setIsSubmitting(false)
        } catch(err){
            setIsSubmitting(false)
            console.log(err.message)
        }
    }

    return (
        <Container>
            {isSubmitting && (
                <LoaderContainer>
                    <Loader size="large"/>
                </LoaderContainer>
            )}
            <Button secondary onClick={() => dispatch(actions.toggleDashboard())}>
                Cancel
            </Button>
            <Button onClick={saveDashboard}>
                Save
            </Button>
        </Container>
    )
}

export default DashboardManager