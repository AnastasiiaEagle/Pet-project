const express = require('express')
const router = express.Router()

const type = require('../controllers/type.js')
const checkAdmin = require('../middleware/checkAdmin')

//save
router.post('/type', checkAdmin, type.save)
//show
router.get('/type', type.show)
//update
router.patch('/type:id', checkAdmin, type.update)
//delete
router.delete('/type:id', checkAdmin, type.delete)

module.exports = router