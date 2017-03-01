Meteor.methods({

  senPush: function ( userId ) {
		if ( userId ) {
      Pushwoosh.createMessage({
        "query": { _id: userId },
        "send_date": "now",
        "ignore_user_timezone": true,
        "content": "Probando 1 2 3..."
      });
		}

	},
});
