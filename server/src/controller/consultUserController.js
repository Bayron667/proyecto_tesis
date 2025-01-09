const connection = require('../model/db');

module.exports.consultUser = (req, res) =>{
    const id = req.params.id;
    const consulta = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    try {
        connection.query(consulta, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: "Ocurrió un error al traer los datos del usuario"});
                return;
            }else{
                res.send(result);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ocurrió un error inesperado"});
    }
}