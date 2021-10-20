const express = require('express')
const router = express.Router()

// controller

const albums_controller = require('../controllers/albums.controller')

router.post('/', albums_controller.create)
router.get('/test', albums_controller.test)
router.get('/:id', albums_controller.getById)

module.exports = router