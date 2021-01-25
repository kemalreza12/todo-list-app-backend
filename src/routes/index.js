const express = require('express')

const routerUsers = require('./users')
const routerTodos = require('./todos')
const routerlabels = require('./labels')

const router = express.Router()

router
    .use('/users', routerUsers)
    .use('/todos', routerTodos)
    .use('/labels', routerlabels)

module.exports = router;