import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Search } from 'semantic-ui-react';
// import { Roles } from 'meteor/alanning:roles';
// import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser }) => {
  const menuStyle = { marginBottom: '30px' };
  return (
    <Menu attached="top" style={menuStyle} borderless inverted>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <img src='images/volunteerAllyIcon.svg' alt='Volunteer Ally icon'/>
      </Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Search placeholder='Search for an opportunity...' fluid/>
      </Menu.Item>
      <Menu.Item position="right">
        {currentUser === '' ? (
          [<Dropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} icon="user" text="Login" pointing="top right" key="login">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} icon="user" text="Sign In" as={NavLink} exact to="/signin" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} icon="add user" text="Sign Up" as={NavLink} exact to="/signup" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} icon="add user" text="Organization Sign Up" as={NavLink} exact to="/organization-signup" />
            </Dropdown.Menu>
          </Dropdown>,
          <Dropdown id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU} icon="bars" pointing="top right" key="mainMenu">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_BROWSE_OPPORTUNITIES} text="Browse Opportunities" as={NavLink} exact to="/browseOpportunities" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ORGANIZATION_LIBRARY} text="Organization Library" as={NavLink} exact to="/list" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ABOUT_US} text="About Us" as={NavLink} exact to="/aboutUs" />
            </Dropdown.Menu>
          </Dropdown>]
        ) : (
          [<Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right" icon={'user'} key="logout">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MY_PROFILE} text="My Profile" as={NavLink} exact to="/myProfile"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MY_OPPORTUNITIES} text="My Opportunities" as={NavLink} exact to="/myOpportunities"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ACCOUNT_SETTINGS} text="Account Settings" as={NavLink} exact to="/accountSettings"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" />
            </Dropdown.Menu>
          </Dropdown>,
          <Dropdown id={COMPONENT_IDS.NAVBAR_USER_HAMBURGER_MENU} icon="bars" pointing="top right" key="userMainMenu">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_BROWSE_OPPORTUNITIES} text="Browse Opportunities" as={NavLink} exact to="/browseOpportunities" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ORGANIZATION_LIBRARY} text="Organization Library" as={NavLink} exact to="/list" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ABOUT_US} text="About Us" as={NavLink} exact to="/aboutUs"/>
            </Dropdown.Menu>
          </Dropdown>]
        ) }
      </Menu.Item>
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
