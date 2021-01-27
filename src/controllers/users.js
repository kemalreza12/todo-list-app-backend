const bcrypt = require('bcryptjs');
const helper = require('../helpers/helpers')
const modelUser = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        const {username, password, role_id} = req.body
        const data = {
            username,
            password,
            role_id,
            confirmed: 0,
            created_at: new Date(),
            updated_at: new Date()
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                data.password = hash
                modelUser.register(data)
                .then((result) => {
                    if (result == 'Email is already exists') {
                        helper.response(res, {message: 'Email is already exists'}, 403, null)
                      } else {
                        helper.response(res, {message: 'Register success'}, 201, null)
                      }
                })
                .catch((err) => {
                    console.log(err);
                });
            });
        });
    },
    login: (req, res) => {
        const {username, password} = req.body
        modelUser.getUsersbyUsername(username)
        .then((result) => {
            if(result.length <1) return helper.response(res, {message: 'Email not Found !!!'}, 201, null)

            const user = result[0]
            bcrypt.compare(password, user.password).then((resCompare) => {
                if(!resCompare) return helper.response(res, {meessage: 'Password is Wrong !!!'}, 201, null)
                const payload = {
                    id: user.id,
                    username: user.username,
                    role_id: user.role_id
                }
                jwt.sign( payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                    user.token = token

                    delete user.password
                    delete user.created_at
                    delete user.updated_at
                    helper.response(res, user, 200)
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
    },
    logout: (req, res) => {
        const id = req.params.id
    
        modelUser.logout(id)
          .then((result) => {
            helper.response(res, null, result, 200, null)
          })
          .catch((err) => {
            console.log(err)
          })
      }
}