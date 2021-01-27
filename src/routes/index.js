const express = require('express')

const routerUsers = require('./users')
const routerTodos = require('./todos')
const routerLabels = require('./labels')

const router = express.Router()

router
    .use('/users', routerUsers)
    .use('/todos', routerTodos)
    .use('/labels', routerLabels)

module.exports = router;