const express = require('express');
const todosController = require('../controllers/todos')
const router = express.Router()
const {verifyAccess} = require('../middlewares/auth')


router
    .get('/:id', todosController.getTaskById)
    .get('/', verifyAccess, todosController.getAllTask)
    .post('/', todosController.insertTask)
    .patch('/:idtes', todosController.updateTask)
    .delete('/:id', todosController.deleteTask)
    

module.exports = router