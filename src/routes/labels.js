const express = require('express');
const labelsController = require('../controllers/labels')
const router = express.Router()
const paginationLabel = require('../middlewares/paginations').labels
const {verifyAccess} = require('../middlewares/auth')

router
    .get('/:id', labelsController.getLabelById)
    .get('/', verifyAccess, paginationLabel, labelsController.getAllLabel)
    .post('/', labelsController.insertLabel)
    .patch('/:idtes', labelsController.updateLabel)
    .delete('/:id', labelsController.deleteLabel)
    

module.exports = router