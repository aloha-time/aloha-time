import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Menu, Dropdown, Search } from 'semantic-ui-react';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser }) => {
  const navbarStyle = { height: '85px', paddingBottom: '5px', backgroundColor: '#0494c4' };
  return (
    <Menu attached="top" style={navbarStyle} borderless inverted>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <img src='images/volunteerAllyIcon.svg' alt='Volunteer Ally icon'/>
      </Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Search placeholder='Search for an opportunity...' fluid/>
      </Menu.Item>
      <Menu.Item position="right">
        {currentUser === '' ? (
          [<Dropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} icon="user" text="Login" pointing="top right"
            key="login">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} icon="user" text="Sign In"
                as={NavLink} exact to="/signin"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} icon="add user"
                text="Volunteer Sign Up" as={NavLink} exact to="/volunteer-signup"/>
            </Dropdown.Menu>
          </Dropdown>,
          <Dropdown id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU} icon="bars" pointing="top right" key="mainMenu">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_BROWSE_OPPORTUNITIES}
                text="Browse Opportunities" as={NavLink} exact to="/browse-opportunities"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_CALENDAR_SCHEDULE}
                text="Calendar Schedule" as={NavLink} exact to="/calendar-schedule"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ORGANIZATION_LIBRARY}
                text="Organization Library" as={NavLink} exact to="/organization-library"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ABOUT_US} text="About Us" as={NavLink} exact
                to="/about-us"/>
            </Dropdown.Menu>
          </Dropdown>]
        ) : (
          [<Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right" icon={'user'}
            key="logout">
            <Dropdown.Menu>
              {Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER]) ? (
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MY_PROFILE} text="My Profile" as={NavLink} exact
                  to="/myProfile"/>)
                : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MY_ORGANIZATION_PROFILE} text="My Organization Profile"
                  as={NavLink} exact
                  to="/my-organization-profile"/>)
                : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MY_OPPORTUNITIES} text="My Opportunities" as={NavLink} exact
                  to="/my-opportunities"/>)
                : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_VERIFY} text="Verify Accounts" as={NavLink} exact
                  to="/verifyAccounts"/>
              ) : ''}
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Sign Out" as={NavLink} exact
                to="/signout"/>
            </Dropdown.Menu>
          </Dropdown>,
          <Dropdown id={COMPONENT_IDS.NAVBAR_USER_HAMBURGER_MENU} icon="bars" pointing="top right" key="mainMenu">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_BROWSE_OPPORTUNITIES}
                text="Browse Opportunities" as={NavLink} exact to="/browse-opportunities"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_CALENDAR_SCHEDULE}
                text="Calendar Schedule" as={NavLink} exact to="/calendar-schedule"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ORGANIZATION_LIBRARY}
                text="Organization Library" as={NavLink} exact to="/organization-library"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ABOUT_US} text="About Us" as={NavLink} exact
                to="/about-us"/>
            </Dropdown.Menu>
          </Dropdown>]
        )}
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
