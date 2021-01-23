import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoggedInTrue from "./LoggedInTrue"
import LoggedInFalse from './LoggedInFalse'



const Header = () => {
    const {
        user
    } = useSelector(state => state)

    return user.isLoggedIn ? <LoggedInTrue /> : <LoggedInFalse /> 
}

export default Header
