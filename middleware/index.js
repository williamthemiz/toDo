


function autenticar(req,res,next){
    if(!req.headers.authorization)
    {
        return res.status(404).send({message:"Token no encontrado"});
    }

    var token = req.headers.authorization.split(" ")[1];

    Usuario.findOne({token:token},function(err,user)
    {
        if(err) return res.status(500).send({message:"Error al procesar la peticion"})

        if(!user) return res.status(404).send("Token Invalido");

        next();
    });

};


module.exports =  autenticar;
