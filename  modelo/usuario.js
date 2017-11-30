var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UsuarioSchema = new Schema({
    user: String,
    password: String,
    token: String
});


module.exports = mongoose.model('usuarios',UsuarioSchema);