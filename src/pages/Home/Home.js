import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../components'
import { TextContainer } from '../Settings/Settings-style'
import { useSelector } from 'react-redux'
import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import ReactSlick from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWindowSize } from '../../functions'


const Container = styled.div`
    grid-column: 1 / -1;
    height: calc(100vh - 5.4rem);
    display: flex;
    justify-content: center;
    background: ${props => props.theme.surface};
    width: 100vw;
    overflow-x: hidden;
    position: relative;

    @media (max-width: 461px){
        height: calc(100vh - 3rem);
        margin-top: 3rem;
    }
`

const Section = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    padding-top: 10rem;
    padding-left: 15rem;
    padding-right: 2rem;

    @media (max-width: 1343px){
        padding-left: 8rem;

    }

    @media (max-width: 952px){
        z-index: 3;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f5f5f5ba;
    }

    @media (max-width: 536px){
        padding-left: 6rem;
    }

    @media (max-width: 408px){
        padding-left: 3rem;
    }


    .slick-slide > div{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
      }

      .slick-dots {
          position: relative;
          display: flex !important;
          height: 2rem;

        @media (max-width: 461px){
            justify-content: center;
        }
      }

      
`

const Icons = styled.div`
    width: 50vw;
    background: ${props => props.theme.surface};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 952px){
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 20rem);
    grid-template-rows: repeat(3, 12rem);
    column-gap: 2rem;
    row-gap: 2rem;
    transform: perspective(200rem) rotateY(1deg) rotateZ(-10deg) skewY(-13deg) skewX(46deg) translateY(-8rem);

    @media (max-width: 1251px){
        grid-template-columns: repeat(3, 16rem);
        grid-template-rows: repeat(3, 10rem);
    }

    @media (max-width: 1100px){
        grid-template-columns: repeat(3, 14rem);
        grid-template-rows: repeat(3, 8rem);
    }

    @media (max-width: 952px){
        transform: perspective(200rem) rotateY(1deg) rotateZ(-10deg) skewY(-13deg) skewX(46deg) translateY(14rem);
    }
    @media (max-width: 692px){
        transform: perspective(200rem) rotateY(1deg) rotateZ(-10deg) skewY(-13deg) skewX(46deg) translateY(18rem) translateX(-3rem);
    }
`

const GridIcon = styled.div`
    background: ${props => props.theme.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    cursor: pointer;
    transition: all .3s ease-in;
    position: relative;
    z-index: 1;

    svg {
        color: ${props => props.theme.text};
        transition: all .3s ease-in;
        width: 4.5rem !important;
        height: 4.5rem !important;

        @media (max-width: 1251px){
            width: 3.5rem !important;
            height: 3.5rem !important;
        }
        @media (max-width: 1100px){
            width: 3rem !important;
            height: 3rem !important;
        }
    }



    ${props => {
        return {
            ...props.style
        }
    }};

    ${props => {
        if(props.active){
            return {
                background: `${props.theme.text} !important`,
                zIndex: 2,
                transform: "translate(3rem, -3rem)",
                boxShadow: "-33px 33px 22px 7px rgb(194 189 189 / 75%)",
                svg: {
                    color: props.theme.surface
                }
            }
        }
    }}
`

const SectionContent = styled.div`

`

const SubTitle = styled.div`
    font-size: 3rem;
    color: ${props => props.theme.text};
    font-family: Montserrat;
    letter-spacing: .3rem;

    @media (max-width: 542px){
        font-size: 2.5rem;

    }
`

const Title = styled.div`
    font-size: 5rem;
    font-weight: 600;
    font-family: Montserrat;
    letter-spacing: .3rem;

    @media (max-width: 542px){
        font-size: 3.5rem;

    }
`

const Text = styled.div`
    font-family: Montserrat;
    font-size: 1.9rem;
    line-height: 1.4;
    margin-top: 3rem;
    color: ${props => props.theme.text};
    padding-right: 8rem;

    @media (max-width: 529px){
        padding-right: 4rem;
    }

    @media (max-width: 408px){
        padding-right: 3rem;
    }
`

const SocialMedia = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 6rem;

    @media (max-height: 529px){
        bottom: 3rem;
    }

    @media (max-width: 461px){
        bottom: 2.5rem;
    }
`

const SocialMediaIcon = styled(FontAwesomeIcon)`
    color: ${props => props.theme.text};
    margin-right: 3rem;
    cursor: pointer;
`

const ButtonContainer = styled.div`
    margin-top: 8rem;
    display: flex;

    @media (max-width: 461px){
        justify-content: center;
    }

    button {
        max-width: 23rem;
    }
`




const Home = () => {

    const [active, setActive] = useState("main")
    const [currentIndex, setCurrentIndex] = useState(0)

    const {
        text : { currentPage : text }
    } = useSelector(state => state)

    const { windowWidth } = useWindowSize()

    const slider = useRef()

    const sections = [
        {
            icon: "columns",
            section: "main",
            style: { gridColumn: "2 / 3", gridRow: "2/3", backgroundImage: "linear-gradient(45deg,#f5f5f5 16%,#ffffff)"},
            content: {
                subtitle: text.main_subtitle,
                title: text.main_title,
                text: "With Moneytor, you'll be able to manage your budget easily.There are many variations of passages of Lorem Ipsum available."
                   
            }
        },
        {
            icon: "chart-line",
            section: "stats",
            style: { gridColumn: "2 / 3", gridRow: "1/2", backgroundImage: "linear-gradient(45deg,#f5f5f5 16%,#ffffff)"},
            content: {
                subtitle: text.stats_subtitle,
                title: text.stats_title,
                text: "With Moneytor, you'll be able to manage your budget easily.There are many variations of passages of Lorem Ipsum available."
                   
            }
        },
        {
            icon: "edit",
            section: "customize",
            style: {gridColumn: "1/2", gridRow: "2/3", backgroundImage: "linear-gradient(45deg,#f5f5f5 16%,#ffffff)" },
            content: {
                subtitle: text.customize_subtitle,
                title: text.customize_title,
                text: "With Moneytor, you'll be able to manage your budget easily.There are many variations of passages of Lorem Ipsum available."
                   
            }
        },
        {
            icon: "user",
            section: "network",
            style: {gridColumn: "3/4", gridRow: "2/3", backgroundImage: "linear-gradient(45deg,#ffffff,#f5f5f5 82%)"},
            content: {
                subtitle: text.network_subtitle,
                title: text.network_title,
                text: "With Moneytor, you'll be able to manage your budget easily.There are many variations of passages of Lorem Ipsum available."
                   
            }
        },
        {
            icon: "cogs",
            section: "security",
            style: {gridColumn: "1/2", gridRow: "3/4", backgroundImage: "linear-gradient(45deg,#f5f5f5 16%,#ffffff)"},
            content: {
                subtitle: text.security_subtitle,
                title: text.security_title,
                text: "With Moneytor, you'll be able to manage your budget easily.There are many variations of passages of Lorem Ipsum available."
                   
            }
        },
        {
            icon: "globe",
            section: "everywhere",
            style: {gridColumn: "2/3", gridRow: "3/4", backgroundImage: "linear-gradient(45deg,#f5f5f5 16%,#ffffff)"},
            content: {
                subtitle: text.everywhere_subtitle,
                title: text.everywhere_title,
                text: "With Moneytor, you'll be able to manage your budget easily.There are many variations of passages of Lorem Ipsum available."
                   
            }
        }
    ]

    const SectionNode = props => {
        const { content } = props
        return (
            <SectionContent>
                <SubTitle>{content.subtitle}</SubTitle>
                <Title>{content.title}</Title>
                <Text>{content.text}</Text>
            </SectionContent>
        )
    }

    useEffect(() => {
        if(windowWidth <= 952){
            slider.current.slickGoTo(currentIndex)
        }
    },[currentIndex, windowWidth])

    const Slider = () => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            initialSlide: currentIndex,
            afterChange: function(index) {
                if(active !== sections[index].section){
                    setActive(sections[index].section)
                    setCurrentIndex(index)
                }
            }
        }
        return (
            <ReactSlick
                {...settings}

                ref={slider}
            >
                {sections.map( section => <SectionNode  content={section.content} key={section.content.title}/> )}
            </ReactSlick>
        )
    }

    const CurrentSection = () => {
        const { content } = sections.filter(section => section.section === active)[0]
        return <SectionNode content={content} />
    }

    const renderIcon = item => {
        return (
            <GridIcon
                key={item.icon}
                {...item}
                active={item.section === active}
                onMouseEnter={() => setActive(item.section)}
            >
                <FontAwesomeIcon icon={item.icon} />
            </GridIcon>
        )
    }




    return (
        <Container>
            <Section>

                {windowWidth > 952 ? <CurrentSection /> : <Slider />}
                <ButtonContainer>
                    <Button primary>
                        Get started
                    </Button>
                </ButtonContainer>
                <SocialMedia>
                    <SocialMediaIcon 
                        icon={faFacebook}
                        size="3x"
                    />
                    <SocialMediaIcon 
                        icon={faInstagram}
                        size="3x"
                    />
                    <SocialMediaIcon 
                        icon={faLinkedinIn}
                        size="3x"
                    />
                </SocialMedia>
            </Section>
            <Icons>
                 <Grid>
                    {sections.map(renderIcon)}
                 </Grid>
            </Icons>
            
        </Container>
    )
}

export default Home
