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
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddOpportunity from '../pages/AddOpportunity';
import EditStuff from '../pages/EditStuff';
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
            <Route path="/myprofile" component={ShowVolunteerProfile}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/organization-signup" component={OrganizationSignup}/>
            <Route path="/volunteer-signup" component={VolunteerSignUp}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/organization-library" component={ListOrg}/>
            <ProtectedRoute path="/orginfo" component={OrgInfo}/>
            <ProtectedRoute path="/my-opportunities" component={ListOpportunity}/>
            <ProtectedRoute path="/browse-opportunities" component={ListOpportunity}/>
            <ProtectedRoute path="/about-us" component={AboutUs}/>
            <ProtectedRoute path="/add-opportunity" component={AddOpportunity}/>
            <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <ProtectedRoute path="/edit-opportunity/:_id" component={EditOpportunity}/>
            <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
            <AdminProtectedRoute path="/manage-database" component={ManageDatabase}/>
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

export default App;
