import { Meteor } from 'meteor/meteor';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
/* eslint-disable no-console */

// Initialize the database with a default opportunity document.
function addOpportunities(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Opportunities.define(data);
}

// Initialize the OpportunitiesCollection if empty.
if (Opportunities.count() === 0) {
  if (Meteor.settings.defaultOpportunities) {
    console.log('Creating default opportunities.');
    Meteor.settings.defaultOpportunities.map(data => addOpportunities(data));
  }
}
