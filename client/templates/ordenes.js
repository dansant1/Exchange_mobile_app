Template.ordenes.onCreated(function () {
	var self = this;

	self.autorun(function () {
		//self.subscribe('ordenes');
		self.subscribe('bancos2');
		self.subscribe('paises');
		self.subscribe('correcciones');
		self.subscribe('dni');
		self.subscribe('companias');
	});
});

Template.ordenes.onCreated( () => {
  let template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );

  template.autorun( () => {
    template.subscribe( 'ordenes2', template.searchQuery.get(), () => {
      setTimeout( () => {
        template.searching.set( false );
      }, 300 );
    });
  });
});

Template.ordenes.onRendered(function () {
	$('#dfs').datepicker();
	$('#hfs').datepicker();

	$('#dfp').datepicker();
	$('#hfp').datepicker();
});

Template.ordenes.helpers({
	searching() {
    	return Template.instance().searching.get();
  	},
  	query() {
    	return Template.instance().searchQuery.get();
  	},
  	ordenes() {
  		let c = Session.get('filter-c');
	    let ordenes = Ordenes.find({compania: c}, {sort: {codigo: -1}});
	    let o = Ordenes.find({}, {sort: {codigo: -1}});
	    if ( ordenes && c) {
	      return ordenes;
	    } else if (ordenes) {
	    	return o;
	    }
  	},
	companias: function () {
		return Companias.find();
	},
	banco: function () {
		return Bancos.findOne({_id: this.beneficiario.banco}).nombre;
	},
	pais: function () {
		return Paises.findOne({_id: this.beneficiario.pais}).nombre;
	},
	estado: function () {
		if (this.estatus === "pendiente") {
			return 1;
		} else if (this.estatus === "procesado") {
			return 2;
		} else if (this.estatus === "anulado") {
			return 3;
		}
	},
	red: function () {
		if (Correcciones.find({'orden.ordenId': this._id}).fetch().length > 0) {
			return 'red';
		} else {
			return '';
		}
	},
	correcciones: function () {
		return Correcciones.find();
	},
	correccion: function () {
		return Correcciones.find({'orden.ordenId': this._id}).fetch().length;
	},
	cantidadDeCorrecciones: function () {
		return Correcciones.find().fetch().length;
	},
	fotos2: function (usuario) {
		return Fotos.find({'metadata.userId': usuario});
	},
	empresa: function () {

		return Companias.findOne({_id: this.compania}).nombre;
	},
	empresae: function () {
		let compania = Ordenes.findOne({_id: this.ordenId}).compania;
		console.log(compania);
		console.log('Hola');
		return Companias.findOne({_id: compania}).nombre;
	}
});

Template.ordenes.events({
	'keyup [name="search"]' ( event, template ) {
	    let value = event.target.value.trim();

	    if ( value !== '' && event.keyCode === 13 ) {
	      template.searchQuery.set( value );
	      template.searching.set( true );
	    }

	    if ( value === '' ) {
	      template.searchQuery.set( value );
	    }
  	},
  	'click .filter-c': function () {
  		Session.set('filter-c', this._id);
  	},
  	'click .filter-all': function () {
  		Session.set('filter-c', null);	
  	},
	'change #estatus': function (e, t) {
		console.log(this._id);

		let datos = {
			estatus: $(e.target).val(),
			id: this._id
		}
		Meteor.call('cambiarEstatus', datos, function (err) {
			if (err) {
				console.log(err);
			}
		});
	},
	'change #compania': function (e, t) {
		
		let companias = $(e.target).val();

		Meteor.call('agregarCompaniaAOrden', this._id, companias, function (err) {
			if (err) {
				console.log(err);
			}
		});
	},
	'click .id': function () {
		Session.set('zoom', this._id);
		Modal.show('zoom');
	},
	'click .corregir': function (e, t) {
		console.log(this._id);
		Meteor.call('corregido', this._id, function (err) {
			if (err) {
				console.log(err);
			}
		});
	},
	'click .confirmar': function (e, t) {
		let datos = {
			i1: t.find("[name=i1" + this._id + "]").value,
			i2: t.find("[name=i2" + this._id + "]").value,
			id: this._id
		}

		console.log(datos);

		if (datos.i1 !== "" && datos.i2 !== "") {

			if (this.estatus === "bloqueado") {
				swal({
				  title: 'Esta orden está bloqueada',
				  text: "¿Estas seguro de procesar orden?",
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Si, Procesar Orden',
				  cancelButtonText: 'No, cancelar',
				  confirmButtonClass: 'btn btn-success',
				  cancelButtonClass: 'btn btn-danger',
				  buttonsStyling: false
				}, function (confirm) {
					if (confirm){
						Meteor.call('ProcesarOrden', datos, function (err, result) {
							if (err) {
								alert(err);
							} else {

							if (result === false) {
								alert('Complete los datos');	
							} else {
								alert(result);
							}
							
						}
						});	
					}
					
				})	
			} else {
				Meteor.call('ProcesarOrden', datos, function (err, result) {
						if (err) {
							alert(err);
						} else {

							if (result === false) {
								alert('Complete los datos');	
							} else {
								alert(result);
							}
							
						}
					});
			}

			
		} else {
			alert('Completa los datos');
		}
	},
	'click .bloquear': function () {
		Meteor.call('bloquearOrden', this._id, function (err) {
			if (err) {
				alert(err);
			} else {
				alert('Orden Bloqueada');
			}
		});
	}
});

Template.zoom.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('dni');
	});
});

Template.zoom.helpers({
	foto: function () {
		return Fotos.find({_id: Session.get('zoom')});
	}
});