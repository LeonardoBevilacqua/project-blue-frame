const Album = require('../models/album.model')
const path = require("path")
const multer = require('multer')
const fs = require('fs')

exports.upload = multer({ dest: path.join(__dirname, `../public`) })

exports.create = (req, res) => {
    Album.create(
        {
            name: req.body.name,
            album: req.body.album
        }
    ).then((album) => res.send(album)).catch((err) => { throw err })
}

exports.createImage = async (req, res) => {
    const album = await Album.findByPk(req.params.id)
    if (!album) {
        res.sendStatus(404)
        fs.unlinkSync(req.file.path)
        return
    }

    album.mimetype = req.file.mimetype
    album.filename = req.file.filename

    const savedAlbum = await album.save()
    res.send(savedAlbum)
}

exports.getImageById = async (req, res) => {
    const album = await Album.findByPk(req.params.id)
    if (!album || !album.mimetype) {
        res.sendStatus(404)
        return
    }
    res.type(album.mimetype).sendFile(path.join(__dirname, `../public/${album.filename}`), (err) => {
        if (err) throw err
    })
}

exports.getById = async (req, res) => {
    const album = await Album.findByPk(req.params.id)
    if (!album) {
        res.sendStatus(404)
        return
    }
    res.send(album)
}

exports.getAll = async (req, res) => {
    const albuns = await Album.findAll()
    res.send(albuns)
}

exports.getAllByAlbum = async (req, res) => {
    const albums = await Album.findAll({ where: { album: req.params.album } })
    res.send(albums)
}
