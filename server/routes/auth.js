const express = require('express')
const router = express.Router()
const checkToken = require('../middleware/checkToken')
const checkAdmin = require('../middleware/checkAdmin')


const user = require('../controllers/auth.js')

//Register
router.post('/register', checkAdmin, user.auth)

//findUsers
router.get('/user', checkAdmin, user.findUsers)

//Login
router.post('/login', user.login)
router.post('/me', checkToken ,user.getMe)

//Delete
router.delete('/delete:id', checkAdmin, user.delete)

module.exports = router