var Album = require('../models/album.model')

exports.create = (req, res) => {
    console.log(req.body)
    let album = new Album(
        {
            name: req.body.name,
            url: req.body.url,
            description: req.body.description
        }
    )

    album.save((err) => {
        //if (err) return next(err)

        res.send('Album saved with success')
    })
}

exports.getById = (req, res) => {
    Album.findById(req.params.id, (err, album) => {
        //if (err) return next(err)
        res.send(album)
    })
}