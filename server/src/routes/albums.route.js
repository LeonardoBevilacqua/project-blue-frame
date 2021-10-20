const express = require('express')
const router = express.Router()

// controller

const albums_controller = require('../controllers/albums.controller')

router.post('/', albums_controller.create)
router.get('/', albums_controller.getAll)
router.get('/image/:id', albums_controller.getImageById)
router.get('/album/:album', albums_controller.getAllByAlbum)
router.get('/:id', albums_controller.getById)

module.exports = router