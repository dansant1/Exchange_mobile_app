import { Meteor } from 'meteor/meteor';

Meteor.startup( () => {
  Pushwoosh.initPushwoosh();
});
