if (Meteor.isCordova) {
  Meteor.startup(function () {

    document.addEventListener('backbutton', function () {
      if (document.location.pathname === "/" || document.location.pathname === "/home") {
        navigator.app.exitApp();
      } else {
        history.go(-1)
      }
    }, false)
  })
}
