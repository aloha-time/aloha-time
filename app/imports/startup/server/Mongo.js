import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the database with a default opportunity document.
function addOpportunities(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Opportunities.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the OpportunitiesCollection if empty.
if (Opportunities.count() === 0) {
  if (Meteor.settings.defaultOpportunities) {
    console.log('Creating default opportunities.');
    Meteor.settings.defaultOpportunities.map(data => addOpportunities(data));
  }
}
