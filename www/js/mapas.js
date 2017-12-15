var app = {
    inicio: function () {
        this.iniciaFastClick();
        var posicion = {};
    },
    iniciaFastClick: function () {
        FastClick.attach(document.body);
    },
    dispositivoListo: function () {

        navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
    },
    pintaCoordenadasEnMapa: function (position) {
        var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFsaW1wIiwiYSI6ImNqYWh5bTBlYzJvN3gzMnE4aHZuM2N6ZGQifQ.a7n9Fyvw4OowydvBe-BvCA', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(miMapa);
        app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);
        miMapa.on('click', function (evento) {
            var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
            app.pintaMarcador(evento.latlng, texto, miMapa);
        });
    },
    errorAlSolicitarLocalizacion: function (error) {
        console.log(error.code + ': ' + error.message);
    },
    logText: function (text) {
        var log = document.querySelector("#log");
        log.innerHTML = text;
    },

    pintaMarcador: function (latlng, texto, mapa) {
        var marcador = L.marker(latlng).addTo(mapa);
        marcador.bindPopup(texto).openPopup();
    },
}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        app.logText('loaded');
        app.inicio();
    }, false);
    document.addEventListener('deviceready', function () {
        app.logText('ready');
        app.dispositivoListo();
    }, false);
}