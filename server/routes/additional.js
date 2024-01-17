const express = require('express')
const router = express.Router()
const multer = require('multer')

const additional = require('../controllers/additional')
const checkAdmin = require('../middleware/checkAdmin')

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/additional')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname=Date.now().toString()+"_"+file.originalname)
    },
})
const upload = multer({ storage })

//save
router.post('/material_additional', checkAdmin, upload.single('image'), additional.save)
//show
router.get('/material_additional', additional.show)
router.get('/material_additional:id', additional.showId)
//update
router.patch('/material_additional:id', checkAdmin, upload.single('image'), additional.update)
//delete
router.delete('/material_additional:id', checkAdmin, additional.delete)

module.exports = router