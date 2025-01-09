const express = require('express');
const router = express.Router();
const {ping} = require('../controller/pingController');
const {login} = require('../controller/loginController');
const {create} = require('../controller/createController');
const {consultUser} = require('../controller/consultUserController');
const {updateUser} = require('../controller/updateUserController');
const {deleteUser} = require('../controller/deleteUserController');
const {updatePasswordUser} = require('../controller/updatePasswordUserController');
const {updateFotoUser} = require('../controller/updateFotoUserController');

router.get('/ping', ping);

router.post('/login', login);

router.post('/create', create);

router.get('/user/:id', consultUser);

router.put('/user/update/:id', updateUser);

router.delete('/user/delete/:id', deleteUser);

router.put('/user/update/password/:id', updatePasswordUser);

router.put('/user/update/foto/:id', updateFotoUser);


module.exports = router;