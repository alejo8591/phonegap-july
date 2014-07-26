var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var states = {};

        states[Connection.UNKNOW] = "Conexión no reconocida";

        states[Connection.WIFI] = "Conexión por WI-FI";

        states[Connection.CELL_2G] = "Conexión por 2G";

        states[Connection.CELL_3G] = "Conexión por 3G";

        states[Connection.CELL_4G] = "Conexión por 4G";

        states[Connection.CELL] = "Conexión generica de red Celular";

        states[Connection.NONE] = "No esta conectado a ninguna red";

        this.checkConnection(states);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    checkConnection: function(states){
        var networkState = navigator.connection.type;

        if(networkState === Connection.NONE){
            this.errorConnection();
        } else {
            navigator.notification.alert(
                "Conectado por " + states[networkState], // Mensaje
                this.myCallback(), // Calback por si se necesita
                "Titulo de conexión",
                "Aceptar"
            ):
        }
    },
    errorConnection: function(){
        navigator.notification.confirm(
            "Error en la conexión", // Mensaje
            this.vibration(1000), // callback opcional
            "Error",
            ["Aceptar", "Salir"]
        );
    },
    vibration : function(time){
        navigator.notification.vibrate(time);
        navigator.notification.bepp(3);
    },

    myCallback : function(){
        console.log("ok");
    }
};
