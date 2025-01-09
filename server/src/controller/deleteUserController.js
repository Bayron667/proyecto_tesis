const connection = require('../model/db');

module.exports.deleteUser = (req, res) =>{
    const id = req.params.id;

    const consulta = 'DELETE FROM usuarios WHERE id_usuario =?';
    console.log(req.body);
    try {
        connection.query(consulta, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({message: "Ocurrió al tratar de eliminar al usuario"});
            }else{
                return res.status(200).json({ message: "Usuario eliminado exitosamente" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Ocurrió un error inesperado"});
    }
}