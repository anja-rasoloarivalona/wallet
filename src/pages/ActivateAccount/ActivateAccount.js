import React, { useState, useEffect } from 'react'
import { client } from '../../functions'
import queryString from 'query-string'
import { Container, Modal, Text } from './ActivateAccount-style'
import { Loader, Success } from '../../components'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const ActivateAccount = props => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState({
                                    activated: false,
                                    message: "Activating your account"
                                })
    const {
        id: userId,
        signature
    } = queryString.parse(window.location.search)

    useEffect(() => {
        const activateAccountHandler = async () => {
            try {
                const res = await client({
                    method: "post",
                    url: "/signup/activate-account",
                    data: {
                        userId: userId,
                        signature: signature
                    }
                })
    
                if(res.status === 201){
                    setAccount({
                        activated: true,
                        message: "Acount activated"
                    })
                    const user = res.data.data
                    dispatch(actions.setUser(user))
                    return props.history.push('/setup')
                }
                setLoading(false)
            } catch(error){
                setLoading(false)
                console.log("FAILED ACTIVATE ACCOUNT", error.message)
            }
        }  
        activateAccountHandler()
    },[])


    return (
        <Container>
            <Modal>
                 {loading && <Loader id="activate-loader" size="large"/>}
                 {!loading && account.activated && <Success /> }
                 <Text>{account.message} ...</Text>
            </Modal>
        </Container>
    )
}

export default ActivateAccount