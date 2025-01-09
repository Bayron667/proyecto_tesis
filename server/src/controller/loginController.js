const connection = require('../model/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { correo, password } = req.body;
    const consulta = 'SELECT * FROM usuarios WHERE correo = ?';
    try {
        connection.query(consulta, [correo], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Ocurrió un error al verificar el correo" }); 
                return;
            }
            if (result.length == 0) {
                // El usuario no existe o contraseña incorrecta
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }

            const usuario = result[0];

            if (usuario.clave !== password) {
                // Contraseña incorrecta
                res.status(401).json({ message: "Contraseña incorrecta" });
                return;
            }

            // Genera el token JWT
            const token = jwt.sign({ id: usuario.id_usuario, correo: usuario.correo, nombre: usuario.nombre, foto: usuario.foto }, 'Stack', {
                expiresIn: '1d'
            });

            res.send({ token });
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Ocurrió un error inesperado" });
        return;
    }
};
