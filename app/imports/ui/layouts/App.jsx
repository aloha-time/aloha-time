import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListOrg from '../pages/ListOrg';
import OrgInfo from '../pages/OrgInfo';
import ListOpportunity from '../pages/ListOpportunity';
import ListOpportunityOrganization from '../pages/ListOpportunityOrganization';
import AddOpportunity from '../pages/AddOpportunity';
import EditOpportunity from '../pages/EditOpportunity';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ShowVolunteerProfile from '../pages/ShowVolunteerProfile';
import ManageDatabase from '../pages/ManageDatabase';
import AboutUs from '../pages/AboutUs';
import { ROLE } from '../../api/role/Role';
import OrganizationSignup from '../pages/OrganizationSignup';
import VolunteerSignUp from '../pages/VolunteerSignUp';
import MyOrganizationProfile from '../pages/MyOrganizationProfile';
import AdminPage from '../pages/AdminPage';
import ViewOpportunity from '../pages/ViewOpportunity';
import EditMyProfile from '../pages/EditMyProfile';
import OpportunityHours from '../pages/OpportunityHours';
import CalendarSchedule from '../pages/CalendarSchedule';
import EditMyOrganizationProfile from '../pages/EditMyOrganizatonProfile';
import EditMyProfileImages from '../pages/EditMyProfileImages';
import EditMyOrganizationProfileImages from '../pages/EditMyOrganizatonProfileImages';
import SubmitHours from '../pages/SubmitHours';
import PasswordChange from '../pages/PasswordChange';
import UsernameChange from '../pages/UsernameChange';
import MyBookmarks from '../pages/MyBookmarks';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <VolunteerProtectedRoute path="/myprofile" component={ShowVolunteerProfile}/>
            <VolunteerProtectedRoute path="/mybookmarks" component={MyBookmarks}/>
            <Route path="/browse-opportunities" component={ListOpportunity}/>
            <Route path="/view-opportunity/:_id" component={ViewOpportunity}/>
            <Route path="/organization-library" component={ListOrg}/>
            <Route path="/about-us" component={AboutUs}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/volunteer-signup" component={VolunteerSignUp}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/calendar-schedule" component={CalendarSchedule}/>
            <Route path="/password-change" component={PasswordChange}/>
            <Route path="/username-change" component={UsernameChange}/>
            <VolunteerProtectedRoute path="/edit-my-profile" component={EditMyProfile}/>
            <VolunteerProtectedRoute path="/edit-my-profile-images" component={EditMyProfileImages}/>
            <VolunteerProtectedRoute path="/opportunity-hours/:_id" component={OpportunityHours}/>
            <VolunteerProtectedRoute path="/submit-hours" component={SubmitHours}/>
            <OrganizationProtectedRoute path="/my-opportunities" component={ListOpportunityOrganization}/>
            <OrganizationProtectedRoute path="/my-organization-profile" component={MyOrganizationProfile}/>
            <OrganizationProtectedRoute path="/edit-my-organization-profile" component={EditMyOrganizationProfile}/>
            <OrganizationProtectedRoute path="/edit-my-organization-profile-images" component={EditMyOrganizationProfileImages}/>
            <Route path="/orginfo/:_id" component={OrgInfo}/>
            <OrganizationProtectedRoute path="/add-opportunity" component={AddOpportunity}/>
            <OrganizationProtectedRoute path="/edit-opportunity/:_id" component={EditOpportunity}/>
            <AdminProtectedRoute path="/manage-database" component={ManageDatabase}/>
            <AdminProtectedRoute path="/admin-page" component={AdminPage}/>
            <AdminProtectedRoute path="/organization-signup" component={OrganizationSignup}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN);
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);
/**
 * OrganizationProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and organization role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const OrganizationProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isOrganization = Roles.userIsInRole(Meteor.userId(), ROLE.ORGANIZATION);
      return (isLogged && isOrganization) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);
/**
 * OrganizationProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and organization role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const VolunteerProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isVolunteer = Roles.userIsInRole(Meteor.userId(), ROLE.VOLUNTEER);
      return (isLogged && isVolunteer) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);
// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};
// Require a component and location to be passed to each OrganizationProtectedRoute.
OrganizationProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each VolunteerProtectedRoute.
VolunteerProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
