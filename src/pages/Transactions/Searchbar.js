import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    // background: red;
    width: 90%;
    margin-bottom: 6rem;
`

const Input = styled.input`
    padding: 1.5rem 1rem;
    padding-left: 3rem;
    width: 40%;
    border: none;
    border-radius: 2rem;
    background: ${props => props.theme.background};
    box-shadow: ${props => props.theme.box_shadow_inset};
    color: ${props => props.theme.active_text};
    :focus {
        outline: none;
    }
`

const Searchbar = props => {
    const { search, setSearch } = props

    const change = e => {
        setSearch(e.target.value)
    }
    return (
        <Container>
            <Input 
                value="Hello"
                onChange={change}
                value={search}
                placeholder="Search ..."
            />
        </Container>
    )
}


export default Searchbar
