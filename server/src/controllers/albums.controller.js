const Album = require('../models/album.model')
const path = require("path")
const multer = require('multer')
const fs = require('fs')

exports.upload = multer({ dest: path.join(__dirname, `../public`) })

exports.create = (req, res) => {
    let album = new Album(
        {
            name: req.body.name,
            album: req.body.album
        }
    )

    album.save((err) => {
        if (err) throw err

        res.send(album)
    })
}

exports.createImage = async (req, res) => {
    const album = await Album.findById(req.params.id)
    if (!album) {
        res.sendStatus(404)
        fs.unlinkSync(req.file.path)
        return
    }

    album.mimetype = req.file.mimetype
    album.filename = req.file.filename

    album.save((err) => {
        if (err) throw err

        res.send(album)
    })
}

exports.getImageById = (req, res) => {
    Album.findById(req.params.id, (err, album) => {
        if (err) throw err
        if (!album || !album.mimetype) {
            res.sendStatus(404)
            return
        }
        res.type(album.mimetype).sendFile(path.join(__dirname, `../public/${album.filename}`), (err) => {
            if (err) throw err
        })
    })
}

exports.getById = (req, res) => {
    Album.findById(req.params.id, (err, album) => {
        if (err) throw err
        if (!album) {
            res.sendStatus(404)
            return
        }
        res.send(album)
    })
}

exports.getAll = (req, res) => {
    Album.find({}, (err, albums) => {
        res.send(albums)
    })
}

exports.getAllByAlbum = (req, res) => {
    Album.find({ album: req.params.album }, (err, albums) => {
        res.send(albums)
    })
}
