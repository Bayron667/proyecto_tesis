const connection = require('../model/db');

module.exports.ping = (req, res) =>{
    const consulta = 'select * from usuarios';
    try {
        connection.query(consulta,(err, result)=>{
            console.log(result);
            res.json(result);
        })
    } catch (e) {

    }
}

