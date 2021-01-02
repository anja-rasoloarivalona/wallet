import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as Chip } from '../../../assets/icons/sim-card.svg'
import { ReactComponent as Money } from '../../../assets/icons/money.svg'
import { Amount } from '../../../components'
import * as actions from '../../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Container = styled.div`
    width: 50rem;
    height: 100vh;
    // background: rgba(0,0,0, .3);
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Asset = styled.div`
    width: 31rem;
    height: 16rem;
    background: ${props => props.theme.surface};
    padding: 2rem;
    border-radius: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

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

const AssetCtaContainer = styled.div`
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
`
const AssetCta = styled(FontAwesomeIcon)`
    color: ${props => props.theme.text};
    cursor: pointer;
    :hover {
        color: ${props => props.theme.active_text};
    }
`

const Type = styled.div`
    display: flex;
    align-items: center;
    height: min-content;
    font-size: 1.6rem;

    svg {
        width: 3rem;
        height: 3rem;
        transform: ${props => props.type !== "cash" ? "rotate(90deg)" : "0"};
        fill: grey;
        margin-right: 1rem;
    }
`

const Title = styled.div`
    padding: 3rem 0;
    font-size: 2rem;
`

const Assets = () => {
    const dispatch = useDispatch()
    const {
        user : { assets },
        text: { currentPage: text }
    } = useSelector(state => state)

    const renderAsset = asset => {
        return (
            <Asset key={asset.id}>
                <Type type={asset.type}>
                    {asset.type === "cash" ? <Money /> : <Chip />}
                    {text[asset.type]}
                </Type>
                <Amount value={asset.amount} />
                <AssetName>{asset.name}</AssetName>
                <AssetCtaContainer>
                    <AssetCta 
                        icon="ellipsis-v"
                        size="2x"
                        onClick={() => dispatch(actions.toggleForm({ form: "assetForm", edited: asset}))}
                    />
                </AssetCtaContainer>
            </Asset>
        )
    }
    return (
        <Container>
            <Title>{text.assets}</Title>
            {assets.map(asset => renderAsset(asset) )}
        </Container>
    )
}

export default Assets
