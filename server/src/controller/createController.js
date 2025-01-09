const connection = require('../model/db');

module.exports.create = (req, res) =>{
    const {nombre, genero, correo, password}= req.body;
    const consulta1 = 'SELECT * FROM usuarios WHERE correo = ?';
    const consulta2 = 'INSERT INTO usuarios (clave, genero, nombre, correo) VALUES (?,?,?,?)';
    console.log(req.body);
    try {
        connection.query(consulta1, [correo], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: "Ocurrió un error al verificar el correo"});
                return;
            }

            if (result.length > 0) {
                res.status(400).json({message: "Ya existe un usuario con este correo"});
                return;
            }

            connection.query(consulta2, [password, genero, nombre, correo], (err, result) => {
                if (err) {
                    res.status(500).json({message: "Ocurrió un error al crear el usuario"});
                } else {
                    res.status(201).json({ message: "Usuario creado exitosamente" });
                }
            });
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ocurrió un error inesperado"});
    }
}