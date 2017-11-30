var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var TareaSchema = new Schema({
    nombre: String,
    descripcion: String,
    fecha: Date,
    entregada: Boolean,
    usuario: {type:Schema.ObjectId,ref:"usuarios"}
});


module.exports = mongoose.model('Tarea',TareaSchema);