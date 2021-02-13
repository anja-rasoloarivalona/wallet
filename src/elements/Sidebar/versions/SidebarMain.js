import React  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List, ListLink, ListItem, IconContainer, ListItemText, Toggler } from '../SideBarStyle'
import { useSelector, useDispatch  } from 'react-redux'
import * as actions from '../../../store/actions'
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'

const SidebarMain = props => {

    const dispatch = useDispatch()

    const {showToggle, showText } = props
 
    const {
        text : { currentPage : text },
        ui: { sidebar },
    } = useSelector(state => state)

    const links = [
        { link: `/${text.link_dashboard}`, icon: "chart-line", label: text.dashboard},
        { link: `/${text.link_transactions}`, icon: faFileAlt, label: text.transactions, exact: false},
        { link: `/${text.link_profile}`, icon: "calculator", label: text.profile, exact: false },
        { link: `/${text.link_settings}`, icon: "cogs", label: text.settings, exact: false}
    ]


    const renderLink = item => {
        return (
            <ListLink key={item.link} to={item.link} exact={item.exact}>
                <ListItem>
                    <IconContainer>
                        <FontAwesomeIcon 
                            icon={item.icon}
                            size="lg"
                        />
                    </IconContainer>
                    <ListItemText shown={showText}>{item.label}</ListItemText>
                </ListItem>
            </ListLink>
        )
    }

    return (
        <>
            <Toggler onClick={() => dispatch(actions.toggleSideBar())} showToggle={showToggle}>
                <FontAwesomeIcon 
                    icon={sidebar.isShown ? "chevron-left" : "chevron-right"}
                    size="lg"
                />
            </Toggler>
            <List>
                {links.map(link => renderLink(link))}
            </List>
        </>
    )
}

export default SidebarMain
