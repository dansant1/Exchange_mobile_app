Meteor.methods({
	agregarSlide: function (datos) {
		if (this.userId) {
			Slides.insert({
				titulo: datos.titulo,
				descripcion: datos.descripcion,
				createdAt: new Date()
			});
		}

	},
	ordenarPais(orden, paisId) {
		orden = parseInt(orden)
		Paises.update({_id: paisId}, {
			$set: {
				orden: orden
			}
		})
	},
	ordenarBanco(orden, _id) {
		orden = parseInt(orden)
		Bancos.update({_id}, {
			$set: {
				orden: orden
			}
		})
	},
	agregarPais: function (nombre) {
		Paises.insert({
			nombre: nombre,
			createdAt: new Date(),
			bancos: []
		});
	},
	destacarBanco(id, destacado) {
		Bancos.update({_id: id}, {
			$set: {
				destacado: destacado
			}
		})
	},
	agregarBanco: function (nombre, paisId) {
		Bancos.insert({
			nombre: nombre,
			createdAt: new Date(),
			paisId: paisId
		});
	},
	updateBanco: function (nombre, bancoId) {
		Bancos.update({_id: bancoId}, {
			$set: {
				nombre: nombre
			}
		})
	},
	updatePais: function (nombre, paisId) {
		Paises.update({_id: paisId}, {
			$set: {
				nombre: nombre
			}
		})
	},
	updateCambio: function (cambio, cambioId) {
		Cambios.update({_id: cambioId}, {
			$set: {
				cambio: cambio,
				quien: Meteor.users.findOne({_id: this.userId}).profile.nombre ? Meteor.users.findOne({_id: this.userId}).profile.nombre : 'Admin',
				hora: new Date()

			}
		});

		let banco = Bancos.findOne({_id: Cambios.findOne({_id: cambioId}).bancoId }).nombre;
		let pais = Paises.findOne({_id: Cambios.findOne({_id: cambioId}).paisId }).nombre;

		if (banco && pais) {
			// Push.send({
      //   		from: 'A&E Envíos',
      //   		title: 'Actualización del Tipo de Cambio',
      //  	 		text: `A&E Envíos: Se actualizó el tipo de cambio del banco ${banco} de ${pais} al valor de ${cambio}`,
      //   		badge: 1,
			// 			query: {
			//
      //   		}
    	// 	});
		}


	},
	sendPush() {
		console.log('Si');
		Push.send({
					from: 'A&E Envíos',
					title: 'Actualización del Tipo de Cambio',
					text: `A&E Envíos actualizó el tipo de cambio`,
					badge: 1,
					query: {}
			});
	},
	agregarAdministrador: function (datos) {

  		var id;

  		id = Accounts.createUser({
    		email: datos.email,
    		password: datos.password,
    		profile: {
    			nombre: datos.nombre,
    			admin: true
    		}
  		});

    	Roles.addUsersToRoles(id, 'admin', 'fundador');


	},
	agregarTelefono: function (telefono) {
			if (Telefono.find().fetch().length > 0) {
				Telefono.update({_id: Telefono.find().fetch()[0]._id}, {
					$set: {
						telefono: telefono
					}
				});
			} else {
				Telefono.insert({
					telefono: telefono
				});
			}
	},
	agregarRango: function (datos) {
		Rangos.insert({
			desde: datos.desde,
			hasta: datos.hasta,
			createdAt: new Date()
		});
	},
	agregarTarifa: function (datos) {

		if (this.userId) {
			let existe = Tarifas.find({paisId: datos.paisId, 'banco.id': datos.banco.id}).fetch().length;

			if (existe === 0 || existe === undefined) {
				Tarifas.insert(datos);
			} else {
				Tarifas.update({paisId: datos.paisId, 'banco.id': datos.banco.id }, {
					$set: {
						'banco.rangos': datos.banco.rangos
					}
				});

				return "Tarifas Actualizadas"
			}
		}
	},
	agregarCambio: function (datos) {

		let cambio = Cambios.findOne({paisId: datos.paisId, bancoId: datos.bancoId});

		if (cambio !== undefined) {
			Cambios.update({paisId: datos.paisId, bancoId: datos.bancoId}, {
				$set: {

					cambio: datos.cambio
				}
			});
		} else {
			Cambios.insert({
				paisId: datos.paisId,
				bancoId: datos.bancoId,
				cambio: datos.cambio
			});
		}

	},
	eliminarPais: function (paisId) {

		let paisTieneBanco = Bancos.find({paisId: paisId}).fetch().length;
		console.log(paisTieneBanco);
		if (paisTieneBanco > 0) {
			return "El país a eliminar tiene un banco asociado, primero tiene que eliminar el banco asociado a este país";

		} else {
			Paises.remove({_id: paisId});
			return "El país se eliminó correctamente";
		}

	},
	eliminarCambio: function (cambioId) {
		Cambios.remove({_id: cambioId});
	},
	eliminarBanco: function (bancoId, paisId) {
		let bancoTieneCambio = Cambios.find({bancoId: bancoId, paisId: paisId}).fetch().length;

		if (bancoTieneCambio > 0) {
			return "El banco que desea eliminar tiene un tipo de cambio asociado, primero tiene que eliminar el tipo de cambio para este banco"
		} else {
			Bancos.remove({_id: bancoId});
			return "El banco se eliminó"
		}
	},
	calcularMonto: function (datos) {

		let total = 0;
		let tarifa = Tarifas.findOne({paisId: datos.paisId, bancoId: datos.bancoId}).rangos

		tarifa.forEach(function (r) {
			if (datos.monto >= r.desde && datos.monto <= r.hasta) {
				total = datos.monto + r.cargo
			}
		});

		return total;

	},
	enviarOrden: function (datos) {

		let total = 0;
		let cargo = 0;

		let dolares = datos.monto;

		let tarifas = Tarifas.findOne({paisId: datos.beneficiario.pais, 'banco.id': datos.beneficiario.banco}).banco;

		console.log(tarifas);

		tarifas.rangos.forEach(function (r) {

			r.desde = parseFloat(r.desde);
			r.hasta = parseFloat(r.hasta);

			if (dolares >= r.desde && dolares <= r.hasta) {
				console.log(r.tarifa);
				cargo = r.tarifa;

				total = parseFloat(dolares) + parseFloat(cargo);
				total = Math.ceil(total);
				console.log(total);
			}
		});

		console.log(cargo);
		console.log(total);

		var codigo = Ordenes.find().fetch().length++;

		Ordenes.insert({
			beneficiario: datos.beneficiario,
			remitente: datos.remitente,
			monto: datos.monto,
			total: total,
			userId: this.userId,
			codigo: Ordenes.find().fetch().length++,
			estatus: 'pendiente',
			tieneCompania: false,
			fechasolicitud: new Date()
		});

		return {
			codigo: codigo
		}
	},
	calcularTarifa: function (datos) {

		let total = 0;
		let cargo = 0;

		let dolares = datos.monto;

		let tarifas = Tarifas.find({paisId: datos.pais, 'banco.id': datos.banco}).fetch()[0].banco;
		console.log(tarifas);

		let cambio = Cambios.find({paisId: datos.pais, bancoId: datos.banco}).fetch();
		console.log(cambio[0].cambio);

		tarifas.rangos.forEach(function (r) {

			r.desde = parseFloat(r.desde);
			r.hasta = parseFloat(r.hasta);
			if (dolares >= r.desde && dolares <= r.hasta) {
				console.log(r.tarifa);
				cargo = r.tarifa;

				total = parseFloat(dolares) + parseFloat(cargo);
				total = Math.ceil(total);
				console.log(total);
			}
		});

		console.log(cargo);
		console.log(total);

		let m = dolares * cambio[0].cambio;
		m.toFixed(2);
		return {
			cargo: cargo,
			total: total,
			cambio: cambio[0].cambio,
			montoreal: m
		}
	},
	calcularTarifaCambio: function (datos) {
		let total = 0;
		let cargo = 0;

		console.log(datos.pais);
		console.log(datos.banco);

		let cambio = Cambios.find({paisId: datos.pais, bancoId: datos.banco}).fetch();
		console.log(cambio[0].cambio);

		let dolares = datos.monto / cambio[0].cambio;

		let tarifas = Tarifas.findOne({paisId: datos.pais, 'banco.id': datos.banco}).banco;
		console.log(tarifas);

		tarifas.rangos.forEach(function (r) {

					r.desde = parseFloat(r.desde);
					r.hasta = parseFloat(r.hasta);

					if (dolares >= r.desde && dolares <= r.hasta) {
						console.log(r.tarifa);
						cargo = r.tarifa;

						total = parseFloat(dolares) + parseFloat(cargo);
						total = Math.ceil(total);
						console.log(total);
					}


		});

		console.log(cargo);
		console.log(total);

		return {
			cargo: parseFloat(cargo),
			total: total,
			montoreal: parseFloat(dolares).toFixed(1),
			cambio: cambio[0].cambio
		}
	},
	verificar(code) {
		let codigo = Tokens.findOne({userId: this.userId}).codigo;
		code = parseInt(code)
		console.log(code)
		if (codigo === code) {
			Meteor.users.update({_id: this.userId}, {
				$set: {
					'profile.verificado': true
				}
			})
			console.log('llego')
			Tokens.remove({userId: this.userId});
		} else {
			throw new Meteor.Error('Codigo Invalido', 'Vuelva a validar el codigo');
		}
	},
	volverAEnviarCodigo(){
		if (this.userId) {
				let codigo = Math.floor(Math.random() * 90000) + 10000;

				Tokens.update({userId: this.userId}, {
					$set: {
						codigo: codigo
					}
				});

				twilio = Twilio('AC5c62385c19fa1af9d3ed6a17a5d153f3', '1f0039be1fec3818aea2d2706603b79d');
				twilio.sendSms({
			    	to:'+' + Meteor.users.findOne({_id: this.userId}).profile.telefono, // Any number Twilio can deliver to
			    	from: '+16464614585', // A number you bought from Twilio and can use for outbound communication
			    	body: `A&E envíos codigo de verificacion ${codigo}` // body of the SMS message
				  	}, function(err, responseData) { //this function is executed when a response is received from Twilio
				    	if (!err) {
				      		console.log(responseData.from);
				      		console.log(responseData.body);
				    	} else {
				    		console.log(err);
				    	}
				});
		}

	},
	agregarUsuario: function (datos) {

			var id = Accounts.createUser({
    		email: datos.email,
    		password: datos.password,
    		profile: datos.profile
     	});

			let codigo;

			if (id) {
				codigo = Math.floor(Math.random() * 90000) + 10000;

				Tokens.insert({
						codigo: codigo,
						userId: id,
						createdAt: new Date()
				});

				twilio = Twilio('AC5c62385c19fa1af9d3ed6a17a5d153f3', '1f0039be1fec3818aea2d2706603b79d');
				twilio.sendSms({
			    	to:'+' + datos.profile.telefono, // Any number Twilio can deliver to
			    	from: '+16464614585', // A number you bought from Twilio and can use for outbound communication
			    	body: `A&E envíos codigo de verificacion ${codigo}` // body of the SMS message
				  	}, function(err, responseData) { //this function is executed when a response is received from Twilio
				    	if (!err) {
				      		console.log(responseData.from);
				      		console.log(responseData.body);
				    	} else {
				    		console.log(err);
				    	}
				});
			}



     	return {
     		id: id
     	}
	},
	olvidePassword: function (email) {

	},
	agregarAsesor: function (datos) {
		var id = Accounts.createUser({
    		email: datos.email,
    		password: datos.password,
    		profile: {
    			nombre: datos.nombre,
    			asesor: true,
    			online: false
    		}
     	});

     	console.log(id);

	},
	editarAsesor: function (id, nombre) {
		Meteor.users.update({_id: id}, {
			$set: {
				'profile.nombre': nombre
			}
		});
	},
	eliminarAsesor: function (id) {
		Meteor.users.remove({_id: id});
	},
	agregarPromocion: function (datos) {
		Promociones.insert({
			titulo: datos.titulo,
			descripcion: datos.descripcion,
			createdAt: new Date()
		});
	},
	online: function () {
		Meteor.users.update({_id: this.userId}, {
			$set: {
				'profile.online': true
			}
		});
	},
	offline: function () {
		Meteor.users.update({_id: this.userId}, {
			$set: {
				'profile.online': false
			}
		});
	},
	enviarMensaje: function (mensaje, asesor) {
		if (this.userId) {
			let id = Mensajes.insert({
				asesor: asesor,
				cliente: this.userId,
				mensaje: mensaje,
				createdAt: new Date()
			});

			if (id) {
				let c = Asuntos.find({clienteId: this.userId, asesorId: asesor}).fetch().length;

				if (c === 0) {
					Asuntos.update({clienteId: asesor, asesorId: this.userId}, {
						$set: {
							createdAt: new Date(),

						}
					});
				} else {
					Asuntos.update({clienteId: this.userId, asesorId: asesor}, {
						$set: {
							createdAt: new Date(),

						}
					});
				}

				Push.send({
	        		from: Meteor.users.findOne({_id: this.userId}).profile.nombre,
	        		title: 'Nuevo Mensaje',
	       	 		text: mensaje,
	        		badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
	        		query: {
	            		userId: asesor
	        		}
    			});

				console.log(c);
			}

			return  {
				id: id
			}
		} else {
			return;
		}
	},
	crearAsunto: function (asesor) {
		if (this.userId) {
			let hayAsuntos = Asuntos.find({clienteId: this.userId, asesorId: asesor}).fetch().length;

			if ( hayAsuntos > 0 ) {
				console.log('asunto ya creado');
			} else {
				Asuntos.insert({
					clienteId: this.userId,
					asesorId: asesor,
					createdAt: new Date()
				});
			}

		} else {
			return;
		}
	},
	cambiarEstatus: function (datos) {

		Ordenes.update({_id: datos.id}, {
			$set: {
				estatus: datos.estatus
			}
		});

		let orden = Ordenes.findOne({_id: datos.id});
		let banco = Bancos.findOne({_id: orden._id}).nombre;

		if (datos.estatus === "procesado") {

			twilio = Twilio('AC5c62385c19fa1af9d3ed6a17a5d153f3', '1f0039be1fec3818aea2d2706603b79d');
			twilio.sendSms({
		    	to:'+' + Ordenes.findOne({_id: datos.id}).beneficiario.telefono, // Any number Twilio can deliver to
		    	from: '+16464614585', // A number you bought from Twilio and can use for outbound communication
		    	body: `A&E envíos le ha procesado la orden ${orden.codigo} con el número de clave ${orden.i1} por solicitud de ${orden.remitente.nombre}. Para ser recogido en el banco ${banco} y ya se encuentra disponible.` // body of the SMS message
			  	}, function(err, responseData) { //this function is executed when a response is received from Twilio
			    	if (!err) {
			      		console.log(responseData.from);
			      		console.log(responseData.body);
			    	} else {
			    		console.log(err);
			    	}
			});
		}

		let o = Ordenes.findOne({_id: datos.id}).userId

		if ( o ) {
			Push.send({
	            from: 'A&E Check Cash',
	            title: 'La orden fue procesada',
	            text: `La orden fue procesada con ${orden.i1} al beneficiario ${orden.beneficiario.nombre}.`,
	            badge: 1,
	            query: {
	                userId: o
	            }
        	});
		}



	},
	agregarCompaniaAOrden: function (id, companias) {
		Ordenes.update({_id: id}, {
			$set: {
				compania: companias,
				tieneCompania: true
			}
		});
	},
	ProcesarOrden: function (datos) {

		if (Ordenes.findOne({_id: datos.id}).tieneCompania === true) {

			if (Ordenes.findOne({_id: datos.id}).estatus === "procesado") {
				return "La orden ya fue procesada."
			} else {
				Ordenes.update({_id: datos.id}, {
				$set: {
					i1: datos.i1,
					i2: datos.i2,
					estatus: 'procesado',
					fechaprocesado: new Date()
				}
			});

			let orden = Ordenes.findOne({_id: datos.id});
			let banco = Bancos.findOne({_id: orden.beneficiario.banco}).nombre;

			if (orden.codigo && orden.i1 && orden.remitente) {
				twilio = Twilio('AC5c62385c19fa1af9d3ed6a17a5d153f3', '1f0039be1fec3818aea2d2706603b79d');
					twilio.sendSms({
				    	to:'+' + Ordenes.findOne({_id: datos.id}).beneficiario.telefono, // Any number Twilio can deliver to
				    	from: '+16464614585', // A number you bought from Twilio and can use for outbound communication
				    	body: `A&E envíos: Está disponible un giro en banco ${banco} por encargo de ${orden.remitente.nombre}.` // body of the SMS message
				  	},
					function(err, responseData) { //this function is executed when a response is received from Twilio
						if (!err) {
						    console.log(responseData.from); // outputs "+14506667788"
						    console.log(responseData.body); // outputs "word to your mother."
						} else {
						    console.log(err);
						}
					});
			}


			let o = Ordenes.findOne({_id: datos.id}).userId

			if ( o ) {
				Push.send({
		            from: 'A&E Check Cash',
		            title: 'La orden fue procesada',
		            text: `La orden fue procesada con código # ${orden.i1} al beneficiario ${orden.beneficiario.nombre}.`,
		            badge: 1,
		            query: {
		                userId: o
		            }
	        	});

				let compania = Companias.findOne({_id: orden.compania}).nombre
				console.log(compania);

				Meteor.defer(function(){
         			Email.send({
	  					to: Meteor.users.findOne({_id: orden.userId}).emails[0].address,
	  					from: "A&E Envíos <aecashchecking@gmail.com>",
	  					subject: "Orden Procesada por A&E Envíos",
	  					text: `La orden fue procesada con código # ${orden.codigo}, y clave ${orden.i1}, usando la compañia de envio ${compania} `
					});
    			});

			}

			return "Orden Procesada";
		}


		} else {
			return false;
		}

	},
	bloquearOrden: function (id) {
		Ordenes.update({_id: id}, {
			$set: {
				estatus: 'bloqueado'
			}
		});
	},
	corregirOrden: function (datos) {

		if (datos.compania) {
			Correcciones.insert({
				orden: datos.orden,
				remitente: datos.remitente,
				problema: datos.problema,
				compania: datos.compania
			});
		} else {
			Correcciones.insert({
				orden: datos.orden,
				remitente: datos.remitente,
				problema: datos.problema
			});
		}



		Ordenes.update({_id: datos.orden.ordenId}, {
			$set: {
				estatus: 'corregido'
			}
		});

		let e =Ordenes.findOne({_id: datos.orden.ordenId}).estatus;
		console.log(e);
	},
	corregido: function (id) {
		Correcciones.remove({_id: id});

	},
	eliminarPromo: function (id) {
		Promociones.remove({_id: id});
	},
	agregarLocal: function (local) {
		Locales.insert({
			texto: local,
			createdAt: new Date()
		});
	},
	eliminarLocal: function (id) {
		Locales.remove({
			_id: id
		});
	},
	editarLocal: function (id, texto) {
		Locales.update({
			_id: id
		}, {
			$set:  {
				texto: texto
			}
		});
	},
	agregarCompania: function (nombre) {
		Companias.insert({
			nombre: nombre,
			createdAt: new Date()
		});
	},
	updateCompania: function (nombre, companiaId) {
		Companias.update({
			_id: companiaId
		},
		{
			$set: {
				nombre: nombre
			}
		});
	},
	eliminarCompania: function (id) {
		Companias.remove({_id: id});
	},
	setColorFondo: function (color) {

		if ( Colores.find().fetch().length > 0 ) {
			let id = Colores.find().fetch()[0]._id;
			Colores.update( {_id: id}, {
				$set: {
					fondo: color
				}
			});
		} else {
			Colores.insert({
				fondo: color
			});
		}
	},
	setColorMenu: function (color) {
		if ( Colores.find().fetch().length > 0 ) {
			let id = Colores.find().fetch()[0]._id;
			Colores.update( {_id: id}, {
				$set: {
					menu: color
				}
			});
		} else {

			Colores.insert({
				menu: color
			});
		}
	}
});
