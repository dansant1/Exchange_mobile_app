Template.editar.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('bancos2');
		self.subscribe('dni');
		self.subscribe('ordenes');
		self.subscribe('companias');
		self.subscribe('colores');
	});

	Session.set('orden', false);
});

Template.editar.helpers({
	bancos: function () {
		return Bancos.find({});
	},
	dni: function () {
		return Fotos.find({'metadata.userId': Meteor.userId()});
	},
	menu: function () {
		return Colores.find().fetch()[0].menu;
	},
	fondo: function () {
		return Colores.find().fetch()[0].fondo;
	},
	ordenes: function () {
		return Ordenes.find({userId: Meteor.userId()});
	},
	companias: function () {
		return Companias.find();
	},
	tieneCompania: function () {
		return Session.get('orden');
	},
	selectedco: function () {
		if ( this._id === Session.get('co') ) {
			return 'selected';
		} else {
			return '';
		}
	}
});

Template.editar.events({
	'click .r': function (e, t) {
		let datos = {
			orden: {
				ordenId: $('#ordenes').val(),
				codigo: $( "#ordenes option:selected" ).text()
			},
			remitente: t.find("[name='remitente']").value,
			banco: {
				bancoId: $('#bancos').val(),
				nombre: $( "#bancos option:selected" ).text()
			},
			problema: t.find("[name='problema']").value
		}

		if (Session.get('orden') === true) {
			
			if ($( "#compania4" ).val() !== "") {
				datos.compania = $( "#compania4" ).val();	
			} else {
				alert('Seleccione una Compañia');
			}
			
		}

		if (datos.problema !== "") {

			Meteor.call('corregirOrden', datos, function (err) {
				if (err) {
					console.log(err);
				} else {
					alert('Corregiste una orden, te responderemos en breve');
					FlowRouter.go('/home');
				}
			});

		} else {
			alert('Ingrese su problema');
		}
	},
	'change #ordenes': function (e, t) {

		if ( Ordenes.findOne({_id: $(e.target).val()}).tieneCompania === true ) {
			Session.set('orden', true);
			Session.set('co', Ordenes.findOne({_id: $(e.target).val()}).compania);
		} else {
			Session.set('orden', false);
		}

		
	}
});