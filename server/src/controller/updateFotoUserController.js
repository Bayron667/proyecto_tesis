const connection = require('../model/db');

module.exports.updateFotoUser = (req, res) =>{
    const id = req.params.id;
    const foto = req.body.foto;

    const consulta = 'UPDATE usuarios SET foto=? WHERE id_usuario=?';
    console.log(req.body);
    try {
        connection.query(consulta, [foto, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({message: "Ocurrió al tratar de actualizar los datos"});
            }else{
                return res.status(200).json({ message: "Foto actualizada exitosamente" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Ocurrió un error inesperado"});
    }
}