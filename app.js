// Módulos
var express = require('express');
var app = express();
var mongo = require('mongodb');
var swig  = require('swig');
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var crypto = require('crypto');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);

// Variables
app.set('db','mongodb://admin:75218221Ma+@tiendamusica-shard-00-00-dwuxn.mongodb.net:27017,tiendamusica-shard-00-01-dwuxn.mongodb.net:27017,tiendamusica-shard-00-02-dwuxn.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true');
app.set('port', 8081);
app.set('clave','abcdefg');
app.set('crypto',crypto);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD); //(app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); //(app, param1, param2, etc.)

// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo");
});