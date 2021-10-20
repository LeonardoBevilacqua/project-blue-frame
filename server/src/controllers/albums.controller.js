const Album = require('../models/album.model')
const path = require("path")

exports.create = (req, res) => {
    console.log(req.body)
    let album = new Album(
        {
            name: req.body.name,
            album: req.body.album,
            description: req.body.description
        }
    )

    album.save((err) => {
        if (err) throw err

        res.send('Album saved with success')
    })
}

exports.getImageById = (req, res) => {
    res.sendFile(path.join(__dirname, `../public/${req.params.id}.jpg`), (err) => {
        if (err) throw err
    })
}

exports.getById = (req, res) => {
    Album.findById(req.params.id, (err, album) => {
        if (err) throw err
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
