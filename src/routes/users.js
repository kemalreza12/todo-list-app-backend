const express = require('express');
const usersController = require('../controllers/users')
const router = express.Router()


router
    .post('/register', usersController.register)
    .post('/login', usersController.login)
    .get('/logout/:id', usersController.logout)

module.exports = router