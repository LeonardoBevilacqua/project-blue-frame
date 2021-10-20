const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AlbumSchema = new Schema({
    name: { type: String, required: true, maxlength: 150 },
    album: { type: String, required: true },
    description: { type: String, maxlength: 255 }
})

module.exports = mongoose.model('Album', AlbumSchema)