const Album = require('../models/album.model')
const path = require("path")

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
        if (err) throw err

        res.send('Album saved with success')
    })
}

exports.test = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/audi_r8_chrome_cw_5_matte_black_black_side_view_97060_1920x1080.jpg'))
}

exports.getById = (req, res) => {
    Album.findById(req.params.id, (err, album) => {
        if (err) throw err
        res.send(album)
    })
}
