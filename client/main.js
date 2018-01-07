import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.login.events({
	'click .boton_entrar'(e, t) {
		let datos = {
			email: t.find("[name='email']").value,
			password: t.find("[name='password']").value
		}

		if (datos.email !== "" && datos.password !== "") {
			Meteor.loginWithPassword(datos.email, datos.password, function (e) {
						if (!e) {
							FlowRouter.go('/home')
						} else {
							alert(e)
						}
			})
		} else {
			alert('Complete los Datos')
		}
	}
})

Template.signup.events({
	'click .boton_entrar'(e, t) {

		let datos = {
			email: t.find("[name='email']").value,
			password: t.find("[name='password']").value,
			profile: {
				nombre: t.find("[name='nombre']").value,
				cel: t.find("[name='telefono']").value,
				nacimiento: t.find("[name='nacimiento']").value
			}
		}

		if (datos.email !== "" && datos.password !== "" && datos.profile.nombre !== "" && datos.cel !== "" && datos.nacimiento !== "") {
			Accounts.createUser(datos, function (err) {
				if (!err) {

					Meteor.loginWithPassword(datos.email, datos.password, function (e) {
						if (!e) {
							FlowRouter.go('/home')
						} else {
							alert(e)
						}
					})

				} else {
					alert(err)
				}
			})
		} else {
			alert('Complete los Datos')
		}




	}
})



Template.home.events({
	'click [name="pedido"]'() {
		FlowRouter.go('/pedido')
	},
	'click [name="e1"]'() {
		FlowRouter.go('/descripcion')
	},
	'click [name="e2"]'() {
		FlowRouter.go('/descripcion2')
	},
	'click [name="e3"]'() {
		FlowRouter.go('/descripcion3')
	},
	'click [name="e4"]'() {
		FlowRouter.go('/descripcion4')
	},
	'click .open'() {
		$('.menu-lateral').toggleClass('open')
	},
	'click .logout'() {
		Meteor.logout()
		FlowRouter.go('/')
	},
	'click .carta2'(e, t) {
		FlowRouter.go('/carta')

	}
})
