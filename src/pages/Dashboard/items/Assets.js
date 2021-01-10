import React from 'react'
import { Item , Title } from '../Dashboard-style'
import { Amount } from '../../../components'
import { useSelector } from 'react-redux'
import { ReactComponent as Chip } from '../../../assets/icons/sim-card.svg'
import { ReactComponent as Money } from '../../../assets/icons/money.svg'
import styled from 'styled-components'


const AssetContainer = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.surface};
    padding: 2rem;
    border-radius: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);


    svg {
        width: 3rem;
        height: 3rem;
        transform: ${props => props.type !== "cash" ? "rotate(90deg)" : "0"};
        fill: grey;
        margin-right: 1rem;
    }

    & > div:nth-child(2) {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
        display: flex;
        align-items: flex-end;
        font-size: 2.3rem;
    }

`

const AssetName = styled.div`
        font-size: 2rem;
        text-align: right;
`

const Type = styled.div`
    display: flex;
    align-items: center;
    height: min-content;
    font-size: 1.6rem;
`

const Asset = props => {
    const { currentPage: text } = useSelector(state => state.text)
    const { asset } = props
    return (
        <Item style={{padding: 0}}>
            <AssetContainer type={asset.type}>
                <Type>
                    {asset.type === "cash" ? <Money /> : <Chip />}
                    {text[asset.type]}
                </Type>
                <Amount value={asset.amount} />
                <AssetName>{asset.name}</AssetName>
            </AssetContainer>
        </Item>
    )
}

export default Asset