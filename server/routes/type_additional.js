const express = require('express')
const router = express.Router()

const type = require('../controllers/type_additional')
const checkAdmin = require('../middleware/checkAdmin')

//save
router.post('/additional_type', checkAdmin, type.save)
//show
router.get('/additional_type', type.show)
//update
router.patch('/additional_type:id', checkAdmin, type.update)
//delete
router.delete('/additional_type:id', checkAdmin, type.delete)

module.exports = router