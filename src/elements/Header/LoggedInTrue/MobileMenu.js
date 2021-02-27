import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import { IconContainer } from '../Header-style'
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { it } from "date-fns/locale";

const Container = styled.div`
    position: relative;
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: 2rem;
`

const List = styled.div`
  position: fixed;
  top: 5.4rem;
  right: 0;
  width: 100vw;
  height: calc(100vh - 5.4rem);
  overflow: overlay;
  background: ${(props) => props.theme.surface};
  padding: 2rem 0;
  padding-left: 1rem;
  display:  ${props => props.show ? "block" : "none"};

  a, a:hover, a:visited, a:active, a:hover {
      color: ${props => props.theme.text};
      text-decoration: none;
  }
`;



const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  position: relative;

  :hover {
    background: ${(props) => props.theme.form.select.optionHoverBackground};
  }

  .drop-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 2rem;
    margin: auto;
  }
`;


const MenuItemIcon = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.theme.text_light};
  margin-right: 2rem;
  margin-left: 0.5rem;
`;

const MenuItemLabel = styled.div``



const MobileMenu = props => {
  const {
    text: { currentPage: text },
  } = useSelector((state) => state);

  const [showList, setShowList] = useState(false);


  const renderMenuItem = item => {
    return (
        <Link to={item.link} key={item.link} onClick={() => setShowList(false)}>
            <MenuItem key={item.link}>
                <MenuItemIcon>
                <FontAwesomeIcon icon={item.icon} />
                </MenuItemIcon>
                <MenuItemLabel>
                    {item.label}
                </MenuItemLabel>

            </MenuItem>
      </Link>
    );
  };



  const menuItems = [
    { link: `/${text.link_dashboard}`, icon: "chart-line", label: text.dashboard},
    { link: `/${text.link_transactions}`, icon: faFileAlt, label: text.transactions, exact: false},
    { link: `/${text.link_profile}`, icon: "calculator", label: text.profile, exact: false },
    { link: `/${text.link_settings}`, icon: "cogs", label: text.settings, exact: false}
 ]




  return (
    <Container>
        <IconContainer onClick={() => setShowList(prev => !prev)}>
            <FontAwesomeIcon
                icon={showList ? "times" : "bars"}
                size="lg"
            />
        </IconContainer>
        <List show={showList}>
            {menuItems.map(renderMenuItem)}
        </List>
    </Container>
  );
};

export default withRouter(MobileMenu);
