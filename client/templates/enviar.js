Template.enviar.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('paises');
		self.subscribe('bancos2');
		self.subscribe('colores');
	});

	if (Session.get('banco100') === "") {
		Session.setDefault('ba', '');	
	} else {
		Session.set('ba', Session.get('pais3'));
	}

	
});

Template.enviar.helpers({
	paises: function () {
		return Paises.find();
	},
	menu: function () {
		return Colores.find().fetch()[0].menu;
	},
	fondo: function () {
		return Colores.find().fetch()[0].fondo;
	},
	bancos: function () {
		return Bancos.find({paisId: Session.get('ba')});
	},
	m: function () {
		return Session.get('m');
	},
	c: function () {
		return Session.get('c');
	},
	t: function () {
		return Session.get('t');
	},
	banker: function () {
		return Session.get('banker');
	},
	ma: function () {
		return Session.get('ma');
	},
	tc: function () {
		return Session.get('tc');
	},
	countrier: function () {
		return Session.get('countrier');
	},
	selectedp: function () {
		if (this._id === Session.get('pais3')) {
			return 'selected'
		} else {
			return ''
		}
	},
	selectedb: function () {
		if (this._id === Session.get('banco100')) {

			return 'selected'
		} else {
			return '';
		}
	}
});

Template.enviar.events({
	'click .e': function (e, t) {
		e.preventDefault();

		let datos = {
			beneficiario: {
				nombre: t.find("[name='nombre']").value,
				ap: t.find("[name='ap']").value,
				am: t.find("[name='am']").value,
				pais: $('#pais3').val(),
				banco: $('#bancotwo').val(),
				telefono: t.find("[name='telf']").value
			},
			remitente: {
				nombre: Meteor.user().profile.nombre + " " + Meteor.user().profile.ap + " " + Meteor.user().profile.am ,
				telefono: Meteor.user().profile.telefono,
				direccion: Meteor.user().profile.direccion
			},
			monto: t.find("[name='monto']").value
		}

		if (datos.beneficiario.nombre !== "" && datos.beneficiario.ap !== "" && datos.beneficiario.am !== "" && datos.beneficiario.pais !== "" && datos.monto !== "" && datos.beneficiario.telefono !== "") {
			
			swal({
			  title: '¿Estas seguro de confirmar la orden?',
			  text: "Esta operación se enviará para ser procesada",
			  type: 'Advertencia',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			},
			function () {
			  Meteor.call('enviarOrden', datos, function (err, result) {
					if (err) {
						alert(err);
					} else {
						Session.set('m', '');
						Session.set('c', '');
						Session.set('t', '');
						Session.set('tc', '');
						Session.set('ma', '');
						alert('La orden #' + result.codigo + ' ha sido confirmada');
						FlowRouter.go('/home');
					}
				});
			})

			
		} else {
			alert('completa los datos');
		}

		
	},
	'click .calc': function (e, t) {
		let datos = {
			pais: $('#pais3').val(),
			banco: $('#bancotwo').val(),
			monto: t.find("[name='montoe']").value
		}

		if (datos.pais !== "" && datos.monto !== "") {
			Meteor.call('calcularTarifaCambio', datos, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					t.find("[name='monto']").value = result.montoreal;
					t.find("[name='montod']").value = result.montoreal;
					
					let c = t.find("[name='cargo']").value = result.cargo;
					
					t.find("[name='total']").value = result.total;
					
					t.find("[name='cambio']").value = result.cambio;
				}
			});
		} else {
			alert('Complete los datos');
		}
	},
	'click .calc-dolar': function (e, t) {
		let datos = {
			pais: $('#pais3').val(),
			banco: $('#bancotwo').val(),
			monto: t.find("[name='montod']").value
		}

		console.log(datos.monto);
		console.log('funco');
		if (datos.pais !== "" && datos.monto !== "") {
			Meteor.call('calcularTarifa', datos, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					t.find("[name='montoe']").value = result.montoreal;
					t.find("[name='monto']").value = datos.monto;
					t.find("[name='cargo']").value = result.cargo;
					
					t.find("[name='total']").value = result.total;
					
					t.find("[name='cambio']").value = result.cambio;
				}
			});
		} else {
			alert('Complete los datos');
		}
	},
	'change #pais3': function (e, t) {
		let bank =  $(e.target).val();

		Session.set('ba', bank);

	}
});