const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AlbumSchema = new Schema({
    name: { type: String, maxlength: 150 },
    album: { type: String, required: true },
    mimetype: { type: String, maxlength: 15 },
    filename: { type: String, maxlength: 255 }
})

module.exports = mongoose.model('Album', AlbumSchema)