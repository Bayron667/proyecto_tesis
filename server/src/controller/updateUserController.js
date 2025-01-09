const connection = require('../model/db');

module.exports.updateUser = (req, res) =>{
    const id = req.params.id;
    const nombre = req.body.nombre;
    const genero = req.body.genero;
    const correo = req.body.correo;
    const foto = req.body.foto;

    const consulta = 'UPDATE usuarios SET nombre=?, genero=?, correo=? WHERE id_usuario=?';
    console.log(req.body);
    try {
        connection.query(consulta, [nombre, genero, correo, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({message: "Ocurrió al tratar de actualizar los datos"});
            }else{
                return res.status(200).json({ message: "Usuario actualizado exitosamente" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Ocurrió un error inesperado"});
    }
}