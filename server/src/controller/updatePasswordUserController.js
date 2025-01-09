const connection = require('../model/db');

module.exports.updatePasswordUser = (req, res) => {
    const id = req.params.id;
    const claveAntigua = req.body.claveAntigua;
    const claveNueva = req.body.claveNueva;

    const consulta1 = 'SELECT clave FROM usuarios WHERE id_usuario = ?';
    console.log(req.body);

    try {
        connection.query(consulta1, [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error en el servidor" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const claveActual = results[0].clave;

            if (claveActual !== claveAntigua) {
                return res.status(401).json({ message: "La contraseña antigua es incorrecta" });
            }

            const consulta2 = 'UPDATE usuarios SET clave = ? WHERE id_usuario = ?';
            connection.query(consulta2, [claveNueva, id], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error en el servidor al actualizar la contraseña" });
                }
                return res.status(200).json({ message: "Contraseña actualizada correctamente" });
            });

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ocurrió un error inesperado" });
    }
}