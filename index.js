var express     = require('express');
var app 		= express();
var bodyParser	= require('body-parser');
var mongoose    = require('mongoose');
var router      = express.Router();
var middleware  = require('./middleware');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/tarea', { useMongoClient: true });
mongoose.Promise = global.Promise;

Tarea = require("./ modelo/tarea");
Usuario = require("./ modelo/usuario");
var controlTarea = require('./controlador/controladorTarea');
var controlAcceso = require("./controlador/controladorAcceso");

app.post("/tareas",controlTarea.agregar);
app.get("/tareas",middleware,controlTarea.mostrarTodas);
app.get("/tareas/:id",controlTarea.mostrar);
app.put("/tareas/:id",controlTarea.modificar);
app.delete("/tareas/:id",controlTarea.eliminar);
app.post("/login",controlAcceso.login);


app.listen(8080,function(){
    console.log("Servidor iniciado...");
});
