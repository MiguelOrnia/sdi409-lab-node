// Módulos
var express = require('express');
var app = express();
var mongo = require('mongodb');
var swig  = require('swig');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Variables
app.set('db','mongodb://admin:75218221Ma+@tiendamusica-shard-00-00-dwuxn.mongodb.net:27017,tiendamusica-shard-00-01-dwuxn.mongodb.net:27017,tiendamusica-shard-00-02-dwuxn.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true');
app.set('port', 8081);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig); //(app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, mongo); //(app, param1, param2, etc.)

// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo");
});