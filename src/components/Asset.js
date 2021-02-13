import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Amount } from '../components'
import { ReactComponent as Chip  } from '../assets/icons/sim-card.svg'
import { ReactComponent as Money } from '../assets/icons/money.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../store/actions'

const Container = styled.div`
    width: 40rem;
    max-width: 40rem;
    height: 20rem;
    box-shadow: ${props => props.theme.box_shadow};
    border-radius: 1.5rem;
    padding: 2rem;
    background: ${props => props.theme.surface};
    position: relative;

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

    .amount {
        grid-column: 1 / -1 !important;
    }

    ${props => {
        if(props.size){
            if(props.size === "small"){
                return {
                    width: "32rem",
                    maxWidth: "32rem",
                    height: "17rem",
                    "div.amount": {
                        fontSize: "2rem"
                    }
                }
            }
        }
    }}

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

const Cta = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    width: 2rem;
    z-index: 2;
    display: flex;
    justify-content: flex-end;

    svg {
        margin: 0;
        color: ${props => props.theme.text_light};
        cursor: pointer;
        :hover {
            color: ${props => props.theme.text};
        }
    }
`

const Asset = props => {
    const dispatch = useDispatch()
    const { currentPage: text } = useSelector(state => state.text)
    const { asset } = props

    const editAsset = () => {
        dispatch(actions.toggleForm({
            form: "assetForm",
            edited: asset
        }))
    }

    return (
        <Container
            type={asset.type}
            size={asset.size}
            style={asset.style ? {...asset.style} : {}}
        >
            <Type>
                {asset.type === "cash" ? <Money /> : <Chip />}
                {text[asset.type]}
            </Type>
            <Amount value={asset.amount} className="amount"/>
            <AssetName>{asset.name}</AssetName>
            <Cta onClick={editAsset}>
                <FontAwesomeIcon 
                    icon="ellipsis-v"
                    size="2x"
                />
            </Cta>
        </Container>
    )
}
export {
    Asset
}
