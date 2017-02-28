Template.promociones.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('promociones');
		self.subscribe('colores');
	});
});

Template.promociones.helpers({
	promociones: function () {
		return Promociones.find()
	},
	fondo: function () {
		return Colores.find().fetch()[0].fondo;
	},
	menu: function () {
		return Colores.find().fetch()[0].menu;
	}
});