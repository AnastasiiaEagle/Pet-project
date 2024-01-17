const express = require('express')
const router = express.Router()
const multer = require('multer')

const wood = require('../controllers/wood.js')
const checkAdmin = require('../middleware/checkAdmin')

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/wood')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname=Date.now().toString()+"_"+file.originalname)
    },
})
const upload = multer({ storage })

//save
router.post('/wood', checkAdmin, upload.single('image'), wood.save)
//show
router.get('/wood', wood.show)
router.get('/wood:id', wood.showID)
//update
router.patch('/wood:id', checkAdmin, upload.single('image'), wood.updata)
//delete
router.delete('/wood:id', checkAdmin, wood.delete)

module.exports = router