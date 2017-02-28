FlowRouter.route('/', {
	name: 'Inicio',
	action() {
		BlazeLayout.render('Home');
	}
});

FlowRouter.route('/home', {
	name: 'Home',
	action() {
		BlazeLayout.render('Home');
	}
});

FlowRouter.route('/registro', {
	name: 'Registro',
	action() {
		BlazeLayout.render('registro');
	}
});

FlowRouter.route('/promociones', {
	name: 'Promos',
	action() {
		BlazeLayout.render('promociones');
	}
});

FlowRouter.route('/chat', {
	name: 'Chat2',
	action: function () {
		
		if (Meteor.userId()) {
			BlazeLayout.render('chat');	

		} else {
			BlazeLayout.render('login3');
		}
		
	}
});

FlowRouter.route('/chat/:asesor', {
	name: 'Chat.New',
	action() {
		BlazeLayout.render('NuevoMensaje');
	}
});

FlowRouter.route('/login', {
	name: 'Login',
	action() {
		BlazeLayout.render('login');
	}
});

FlowRouter.route('/olvide', {
	name: 'Olvide',
	action() {
		BlazeLayout.render('olvide');
	}
});

FlowRouter.route('/enviar', {
	name: 'Enviar',
	action() {
		BlazeLayout.render('enviar');
	}
});

FlowRouter.route('/editar', {
	name: 'Editar',
	action() {
		BlazeLayout.render('editar');
	}
});

FlowRouter.route('/ordenes', {
	name: 'Ordenes',
	action() {
		BlazeLayout.render('ordenes');
	}
});

FlowRouter.route('/ordenes/:orden', {
	name: 'Orden',
	action() {
		BlazeLayout.render('orden');
	}
});

FlowRouter.route('/calculadora', {
	name: 'Calculadora',
	action() {
		BlazeLayout.render('calculadora');
	}
});

// Admin
FlowRouter.route('/admin', {
	name: 'Admin',
	action() {
		console.log('hola');
		BlazeLayout.render('Admin', { content: "adminHome"});
		console.log('mudno');
	}
});

FlowRouter.route('/admin/tarifas', {
	name: 'Admin.tarifas',
	action() {
		BlazeLayout.render('Admin', {content: "TarifasAdmin"});
	}
});

FlowRouter.route('/admin/promociones', {
	name: 'Admin.promociones',
	action() {
		BlazeLayout.render('Admin', {content: "PromocionesAdmin"});
	}
});

FlowRouter.route('/admin/ordenes', {
	name: 'Admin.ordenes',
	action() {
		BlazeLayout.render('Admin', {content: "ordenes"});
	}
});

FlowRouter.route('/admin/disenio', {
	name: 'Admin.disenio',
	action() {
		BlazeLayout.render('Admin', {content: "disenio"});
	}
});

FlowRouter.route('/asesores', {
	name: 'Asesores',
	action() {
		BlazeLayout.render('AdminAsesor');
	}
});