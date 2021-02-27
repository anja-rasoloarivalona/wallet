import styled from 'styled-components'

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: calc(100vh - 5.4rem);
    background: ${props => props.theme.background};
    display: flex;
    padding-left: 7rem;
    padding-right: 5rem;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 767px){
        padding: 0 4rem;
    }
`

const Title = styled.div`
    padding-top: 3rem;
    padding-bottom: 2rem;
    font-size: 2rem;
    position: relative;
    max-width: 60rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;

    @media screen and (max-width: 767px){
        max-width: unset;
    }


    &:after {
        content: "";
        position: absolute;
        bottom: -.5px;
        left: 0;
        width: 100%;
        background: ${props => props.theme.text_light};
        height: 1px;

    }
`

const TitleText = styled.div``

const TitleCta = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.text_light};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        color: ${props => props.theme.text_light};
    }

    :hover {
        background: ${props => props.theme.surface};
        border: 1px solid ${props => props.theme.primary};
        svg {
            color: ${props => props.theme.primary};
        }

    }


`

const Content = styled.div`
    display: flex;
    flex-direction: column;
`

export {
    Container, 
    Title,
    TitleText,
    TitleCta,
    Content
}