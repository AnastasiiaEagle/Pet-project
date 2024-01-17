const express = require('express')
const router = express.Router()
const multer = require('multer')

const color = require('../controllers/color.js')
const checkAdmin = require('../middleware/checkAdmin')


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/color')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname=Date.now().toString()+"_"+file.originalname)
    },
})
const upload = multer({ storage })

//save
router.post('/color', checkAdmin, upload.single('image'), color.save)
//show
router.get('/color', color.show)
router.get('/color:id', color.showID)
//update
router.patch('/color:id', checkAdmin, upload.single('image'), color.update)
//delete
router.delete('/color:id', checkAdmin, color.delete)

module.exports = router