import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {


  Push.Configure({
    /*apn: {
      certData: Assets.getText('prod/aps.pem'),
      keyData: Assets.getText('prod/certificado.pem'),
      passphrase: 'daniel',
      production: true,
      gateway: 'gateway.push.apple.com',
      //gateway: 'gateway.sandbox.push.apple.com'
    },*/
    gcm: {
      apiKey: 'AAAAOUpMpgc:APA91bHrSM4EPE69_TMLiuIg7kK8ayaidtT4CFlH6uyAeJYBe5HBfMtLM-zPKWXFwUh2FL8XgM-ey5Q-65u6lxrnQxzcfue02WwIIO1uSOfPy3eM1OM7JaH4gn3yc_VDVjm4QnNFqdhq',
      projectNumber: 246059673095
    }
  });

  //Push.debug=true;
});

Meteor.startup(function () {

  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };

});
