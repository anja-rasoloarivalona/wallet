import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import * as reduxActions from "../../../store/actions";
import { useOnClickOutside } from "../../../functions";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { IconContainer } from '../Header-style'

const Container = styled.div`
    position: relative;
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`

const List = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 37rem;
  height: min-content;
  background: ${(props) => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
  padding: 2rem 0;
  display:  ${props => props.show ? "block" : "none"};
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.text_light};
  margin: 0 1.5rem;
  padding-bottom: 2rem;
`;

const HeaderAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c2c2c2;
  border: 1px solid ${(props) => props.theme.text_light};
  margin-right: 2rem;

  svg {
    color: ${(props) => props.theme.background};
  }
`;

const HeaderText = styled.div``;

const HeaderUserName = styled.div`
  text-transform: capitalize;
  font-size: 1.7rem;
  font-weight: 600;
`;

const HeaderCta = styled(Link)`
  line-height: 1.4;
  cursor: pointer;
  text-decoration: none;

  &,
  &:active,
  &:visited {
    color: ${(props) => props.theme.text_light};
  }

  :hover {
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  height: ${props => props.currentSection ? "14rem" : '24rem'};
  transition: all .3s ease-in;
`;

const Action = styled.div`
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

const ActionIcon = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.theme.text_light};
  margin-right: 1rem;
  margin-left: 0.5rem;
`;

const ActionList = styled.form`
  margin-right: 1rem;
  margin-left: 6rem;
  padding: 0 1rem;
`;
const ActionListItem = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionInput = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.text_light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Check = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${(props) => props.theme.primary};
`;

const Main = styled.div`
  transition: all 0.3s ease;
  transform: ${(props) => (props.show ? "none" : "translateX(-100%)")};
`;

const Sub = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  transition: all 0.3s ease;
  transform: ${(props) => (props.show ? "translateX(0%)" : "translateX(100%)")};
`;

const LanguageComponent = (props) => {
  const dispatch = useDispatch();

  const {
    settings: { lang },
    text: { currentPage: text },
  } = useSelector((state) => state);

  const updateLang = (selectedLang) => {
    if (lang !== selectedLang) {
      dispatch(reduxActions.setLang(selectedLang));
    }
  };

  return (
    <>
      <Action>
        <ActionIcon onClick={props.close}>
          <FontAwesomeIcon icon="arrow-left" />
        </ActionIcon>
        {text.language}
      </Action>
      <ActionList>
        <ActionListItem onClick={() => updateLang("fr")}>
          French
          <ActionInput>{lang === "fr" && <Check />}</ActionInput>
        </ActionListItem>
        <ActionListItem>
          English
          <ActionInput onClick={() => updateLang("en")}>
            {lang === "en" && <Check />}
          </ActionInput>
        </ActionListItem>
      </ActionList>
    </>
  );
};

const ThemeComponent = (props) => {
  const dispatch = useDispatch();

  const {
    settings: { theme },
    text: { currentPage: text },
  } = useSelector((state) => state);

  const updateTheme = (selectedTheme) => {
    if (theme !== selectedTheme) {
      dispatch(reduxActions.updateTheme(selectedTheme));
    }
  };

  return (
    <>
      <Action>
        <ActionIcon onClick={props.close}>
          <FontAwesomeIcon icon="arrow-left" />
        </ActionIcon>
        {text.theme}
      </Action>
      <ActionList>
        <ActionListItem onClick={() => updateTheme("light")}>
          Light
          <ActionInput>{theme === "light" && <Check />}</ActionInput>
        </ActionListItem>
        <ActionListItem onClick={() => updateTheme("dark")}>
          Dark
          <ActionInput>{theme === "dark" && <Check />}</ActionInput>
        </ActionListItem>
      </ActionList>
    </>
  );
};

const ProfileDropDown = () => {
  const {
    user,
    text: { currentPage: text },
  } = useSelector((state) => state);

  const [currentSection, setCurrentSection] = useState(null);
  const [showList, setShowList] = useState(false);
  const container = useRef()


  const onClickOutsideHandler = () => {
      if(showList){
          setShowList(false)
          setCurrentSection(null)
      }
  }

  useOnClickOutside(container, () => onClickOutsideHandler())

  const renderAction = (action) => {
    return (
      <Action key={action.id} onClick={() => setCurrentSection(action)}>
        <ActionIcon>
          <FontAwesomeIcon icon={action.icon} />
        </ActionIcon>
        {action.label}
        {action.dropdown && (
          <FontAwesomeIcon
            icon="chevron-right"
            size="1x"
            className="drop-icon"
          />
        )}
      </Action>
    );
  };

  const actions = [
    {
      id: "language",
      icon: "globe",
      label: text.language,
      dropdown: LanguageComponent,
    },
    { 
        id: "theme",
        icon: "moon",
        label: text.theme,
        dropdown: ThemeComponent 
    },
    { id: "settings", icon: "cogs", label: text.settings },
    { id: "logout", icon: "power-off", label: text.logout },
  ];

  const CurrentDrop = currentSection ? currentSection.dropdown : null;

  return (
    <Container>
      <IconContainer onClick={() => setShowList(prev => !prev)}>
        <FontAwesomeIcon icon={faUser} size="lg" />
      </IconContainer>
      <List
        show={showList}
        ref={container}
      >
          <Header>
            <HeaderAvatar>
              <FontAwesomeIcon icon="user" size="2x" />
            </HeaderAvatar>
            <HeaderText>
              <HeaderUserName>{user.username}</HeaderUserName>
              <HeaderCta>See your account</HeaderCta>
            </HeaderText>
          </Header>
          <Actions currentSection={currentSection}>
            <Main show={!currentSection}>
                {actions.map(renderAction)}
            </Main>
            <Sub show={currentSection}>
              {CurrentDrop && (
                <CurrentDrop close={() => setCurrentSection(false)} />
              )}
            </Sub>
          </Actions>
        </List>
    </Container>
  );
};

export default ProfileDropDown;
