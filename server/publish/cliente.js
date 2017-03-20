Meteor.publish('slides', function () {

	return Slides.find();

});

Meteor.publish('paises', function () {
	return Paises.find();
});

Meteor.publish('bancos2', function () {

	return Bancos.find();

});

Meteor.publish('companias', function () {
	return Companias.find();
});

Meteor.publish('locales', function () {
	return Locales.find();
});

Meteor.publish('rango', function () {
	return Rangos.find();
});

Meteor.publish('promociones', function () {
	return Promociones.find();
});

Meteor.publish('tarifas', function () {
	return Tarifas.find();
});

Meteor.publish('dni', function () {
	return Fotos.find();
});

Meteor.publish('ordenes', function () {
	return Ordenes.find();
});

Meteor.publish('telefono', function () {
	return Telefono.find();
});


Meteor.publish('administradores', function () {
	return Meteor.users.find({'profile.admin': true});
});

Meteor.publish('Landing', function () {
	console.log('hola3');
	return Landing.find({});

});


Meteor.publish('correcciones', function () {
	return Correcciones.find();
});

Meteor.publish('cambios2', function () {
	return Cambios.find();
});

Meteor.publish('colores', function () {
	return Colores.find();
});

Meteor.publish('asesores', function () {
	return Meteor.users.find({'profile.asesor': true});
});

Meteor.publish( 'chat', function( de ) {

  if (this.userId) {
		return Mensajes.find({
      		$or: [ { cliente: this.userId, asesor: de }, { cliente: de, asesor: this.userId } ]
    	});
  } else {
		this.stop();
		return;
	}
});

Meteor.publish('asuntos', function () {
	if (this.userId) {
		return Asuntos.find({
			asesorId: this.userId
		});
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('asuntosPorCliente', function () {
	if (this.userId) {
		return Asuntos.find({
			clienteId: this.userId
		});
	} else {
		this.stop();
		return;
	}
});

Meteor.publish( 'ordenes2', function( search ) {
  //check( search, Match.OneOf( String, null, undefined ) );

  console.log(search);

  let query      = {},
      projection = { limit: 10, sort: { codigo: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { codigo: regex },
        { i1: regex },
        { i2: regex },
        { estatus: regex },
        { 'beneficiario.nombre': regex},
        { 'beneficiario.ap': regex},
        { 'beneficiario.am': regex},
        { 'beneficiario.telefono': regex},
        { 'remitente.nombre': regex},
        { 'remitente.direccion': regex},
        { 'remitente.telefono': regex},
      ]
    };

    projection.limit = 100;
  }

  return Ordenes.find( query, projection );
});

Meteor.publish('usuarios', function () {
	if (this.userId) {
		return Meteor.users.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('fotosMensajes', function () {
	if (this.userId) {
		return FotosMensajes.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('perfiles', function () {
	if (this.userId) {
		//console.log('hello');
		return FotosVendedor.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('mensajes', function () {
	if (this.userId) {
		console.log('hello');
		return Mensajes.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('ultimos', function () {
	if (this.userId) {
		return Ultimo.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('banderas', function () {
	if (this.userId) {
		return Banderas.find();
	} else {
		this.stop();
		return;
	}
});
