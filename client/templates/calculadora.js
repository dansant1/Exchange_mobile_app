Template.calculadora.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('paises');
		self.subscribe('bancos2');
		self.subscribe('colores');
	});

	Session.setDefault('banco', '');
});

Template.calculadora.helpers({
	bancos: function () {
		return Bancos.find({paisId: Session.get('banco')});
	},
	paises: function () {
		return Paises.find();
	},
	menu: function () {
		return Colores.find().fetch()[0].menu;
	},
	fondo: function () {
		return Colores.find().fetch()[0].fondo;
	}
});

Template.calculadora.events({
	'change #pais': function (e, t) {
		let bank =  $(e.target).val();

		Session.set('banco', bank);

	},
	'click .calc': function (e, t) {
		let datos = {
			pais: $('#pais').val(),
			banco: $('#banco').val(),
			monto: t.find("[name='monto']").value
		}

		if (datos.pais !== "" && datos.monto !== "") {
			Meteor.call('calcularTarifaCambio', datos, function (err, result) {
				if (err) {
					
				} else {
					t.find("[name='monto2']").value = result.montoreal;
					Session.set('m', result.montoreal);
					Session.set('pais3', datos.pais);
					Session.set('banco100', datos.banco);
					Session.set('ma', datos.monto);
					Session.set('banker', datos.banco);
					Session.set('countrier', datos.pais);
					let c = t.find("[name='cargo']").value = result.cargo;
					Session.set('c', result.cargo);
					t.find("[name='total']").value = result.total;
					Session.set('t', result.total);
					t.find("[name='cambio']").value = result.cambio;
					Session.set('tc', result.cambio);
					t.find("[name='montod']").value = result.montoreal;
				}
			});
		} else {
			alert('Complete los datos');
		}
	},
	'click .calc-dolar': function (e, t) {
		let datos = {
			pais: $('#pais').val(),
			banco: $('#banco').val(),
			monto: t.find("[name='montod']").value
		}

		console.log(datos.monto);
		console.log(datos.pais);
		if (datos.pais !== "" && datos.monto !== "") {
			Meteor.call('calcularTarifa', datos, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					t.find("[name='monto']").value = result.montoreal.toFixed(2);
					t.find("[name='monto2']").value = datos.monto; 
					Session.set('m', result.montoreal.toFixed(2));
					Session.set('pais3', datos.pais);
					Session.set('banco100', datos.banco);
					Session.set('ma', datos.monto);
					Session.set('banker', datos.banco);
					Session.set('countrier', datos.pais);
					let c = t.find("[name='cargo']").value = result.cargo;
					Session.set('c', result.cargo);
					t.find("[name='total']").value = result.total;
					Session.set('t', result.total);
					t.find("[name='cambio']").value = result.cambio;
					Session.set('tc', result.cambio);

					/*t.find("[name='montoe']").value = result.montoreal;
					t.find("[name='monto']").value = datos.monto;
					t.find("[name='cargo']").value = result.cargo;
					
					t.find("[name='total']").value = result.total;
					
					t.find("[name='cambio']").value = result.cambio;*/
				}
			});
		} else {
			alert('Complete los datos');
		}
	}
});