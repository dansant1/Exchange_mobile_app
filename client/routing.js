FlowRouter.route('/', {
	name: 'Inicio',
	action() {
		BlazeLayout.render('inicio')
	} 
})

FlowRouter.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render('login')
	} 
})

FlowRouter.route('/signup', {
	name: 'signup',
	action() {
		BlazeLayout.render('signup')
	} 
})

FlowRouter.route('/home', {
	name: 'home',
	action() {
		BlazeLayout.render('home')
	} 
})

FlowRouter.route('/descripcion', {
	name: 'descripcion',
	action() {
		BlazeLayout.render('descripcion_menu')
	} 
})

FlowRouter.route('/descripcion2', {
	name: 'descripcion',
	action() {
		BlazeLayout.render('descripcion_menu2')
	} 
})

FlowRouter.route('/descripcion3', {
	name: 'descripcion',
	action() {
		BlazeLayout.render('descripcion_menu3')
	} 
})

FlowRouter.route('/descripcion4', {
	name: 'descripcion',
	action() {
		BlazeLayout.render('descripcion_menu4')
	} 
})

FlowRouter.route('/carta', {
	name: 'carta',
	action() {
		BlazeLayout.render('carta')
	} 
})

FlowRouter.route('/pedido', {
	name: 'pedido',
	action() {
		BlazeLayout.render('menu_pedido')
	} 
})