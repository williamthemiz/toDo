var servicios = require('../servicios');

function agregar(req,res)
{
    var tarea = new Tarea();      
    tarea.nombre = req.body.nombre;
    tarea.descripcion = req.body.descripcion;
    tarea.fecha = req.body.fecha;
    tarea.entregada = req.body.entregada;
    tarea.usuario = servicios.devolverId(req.headers.authorization.split(" ")[1]);
    tarea.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Tarea creada!' });
    });
};

function mostrarTodas(req,res)
{
    var id = servicios.devolverId(req.headers.authorization.split(" ")[1]);
    console.log(id);
    Tarea.find({usuario:id},function(err,tareas)
    {
        if(err) return res.status(500).send({message:"Error al realizar la peticion"});
        if(!tareas) return res.status(404).send({message: "No existen tareas"});
        res.json(tareas);
    });
};

function mostrar(req,res)
{
    Tarea.find({"_id":req.params.id},function(err,tarea)
    {
        if(err) return res.status(500).send({message:"Error al realizar la peticion"});
        if(!tarea) return res.status(404).send({message:"No se encontro la tarea"});

        console.log(tarea);
        res.status(200).send({tarea:tarea});
    });
};

function modificar(req,res)
{
    var update = req.body;

    Tarea.findByIdAndUpdate(req.params.id,update, function(err, tarea) 
    {
        if (err)
            res.send(err);

        res.status(200).send({ message: 'Tarea actualizada!' });
        

    });

};

function eliminar(req,res)
{
    Tarea.findByIdAndRemove(req.params.id,function(err){
        if(err) return res.status(500).send({message:"Error al eliminar"});

        res.status(200).send({message:"Tarea Eliminada"});
    });
};

module.exports = {
    agregar,
    mostrarTodas,
    mostrar,
    modificar,
    eliminar
}


