import { manageDatabasePage, signOutPage } from './simple.page';
import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { volunteerSignUp } from './volunteersignup.page';
import { landingPage } from './landing.page';
import { aboutUsPage } from './aboutus.page';
import { calendarSchedulePage } from './calendarschedule.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = {
  firstName: 'jane',
  lastName: 'foo',
  email: 'jane@foo.com',
  dateOfBirth: '12/25/1999',
  primaryAddress: '92-1047 Olani St Unit 1206',
  city: 'Kapolei',
  state: 'HI',
  zipcode: '96707',
  phoneNumber: '8081234567',
  username: 'janefoo',
  password: 'changeme',
  conPassword: 'changeme',
};

fixture('matrp localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that sign in and sign out work', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that volunteer sign up and sign out work', async () => {
  await navBar.gotoVolunteerSignupPage();
  await volunteerSignUp.isDisplayed();
  await volunteerSignUp.signupVolunteer(
    newCredentials.firstName,
    newCredentials.lastName,
    newCredentials.email,
    newCredentials.dateOfBirth,
    newCredentials.primaryAddress,
    newCredentials.city,
    newCredentials.state,
    newCredentials.zipcode,
    newCredentials.phoneNumber,
    newCredentials.username,
    newCredentials.password,
    newCredentials.conPassword,
  );
});

test('Test the Calendar Schedule page', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(newCredentials.username, newCredentials.password);
  await navBar.goToCalendarSchedulePage();
  await calendarSchedulePage.isDisplayed();
});

test('Test the About Us page', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(newCredentials.username, newCredentials.password);
  await navBar.goToAboutUsPage();
  await aboutUsPage.isDisplayed();
});

test('Test that user pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that admin pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
});
