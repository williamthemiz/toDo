var bcrypt = require('bcrypt');
var User = require('../ modelo/usuario.js');
var servicios = require('../servicios');

function login(req,res)
{
    var username = req.body.user;
    var pass = req.body.pass;

   //let hash = bcrypt.hashSync('12345', 10);

   User.findOne({nombre:username},function(err,user)
   {
       if(err) return res.status(500).send({message:"Error al realizar la peticion"});
       if(!user) return res.status(404).send({message:"Acceso incorrecto"});
       if(bcrypt.compareSync(pass,user.password)) 
       {
           let token = servicios.crearToken(user);
           let update = {"token":token};
           console.log(update);
        User.findByIdAndUpdate(user._id,update,function(err){
            if(err) return res.status(500).send("Error al crear token");

            res.status(200).send({message:token});
        });
       } 
       else 
       {
        res.status(403).send({message: "Autenticacion incorrecta"});
       }

   });

    
};

function logout(){

};

module.exports = {
    login,
    logout
}