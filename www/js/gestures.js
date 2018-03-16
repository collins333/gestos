var app = {
	inicio: function(){
		this.iniciaBotones()
		this.iniciaFastClick()
		this.iniciaHammer()
	},

	iniciaFastClick: function(){
		FastClick.attach(document.body)
	},

	iniciaBotones: function(){
		var btnClaro = document.querySelector('#claro'),
			btnOscuro = document.querySelector('#oscuro')
		
		btnClaro.addEventListener('click', this.ponerClaro)
		btnOscuro.addEventListener('click', this.ponerOscuro)
		btnClaro.addEventListener('dblclick', this.quitarClase)
		btnOscuro.addEventListener('dblclick', this.quitarClase)
	},

	iniciaHammer: function(){
		var zona = document.querySelector('#zona-gestos'),
			info = document.querySelector('#info'),
			hammertime = new Hammer(zona)

		hammertime.get('pinch').set({
			enable: true
		})
		hammertime.get('rotate').set({
			enable: true
		})

		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className = ('' || 'volver')
			info.innerHTML = 'gesto...!'
		})

		hammertime.on('tap doubletap swipe press rotate', function(ev){
			document.querySelector('#info').innerHTML = ev.type+'...!'
		})

		hammertime.on('tap', function(ev){
			zona.className = 'tap'
		})

		hammertime.on('doubletap', function(ev){
			zona.className = 'dobleTap'
		})

		hammertime.on('press', function(ev){
			zona.className = 'press'
		})

		hammertime.on('swipe', function(ev){
			var clase = undefined,
				direccion = ev.direction

			if(direccion === 2){
				clase = 'swipe-izquierda'
			}
			if(direccion === 4){
				clase = 'swipe-derecha'
			}

			zona.className = clase
		})

		hammertime.on('rotate', function(ev){
			var umbral = 25

			// if(ev.distance > umbral){
			// 	zona.className = 'rotate'
			// }

			if(ev.angle > umbral){
				zona.className = 'rotate-dcha'
			}
			if(ev.angle < -umbral){
				zona.className = 'rotate-izda'
			}
		})
	},

	ponerClaro: function(){
		document.body.className = 'claro'
	},

	ponerOscuro: function(){
		document.body.className = 'oscuro'
	},

	quitarClase: function(){
		document.body.className = 'volver'
	}
}

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio()		
	})
}

