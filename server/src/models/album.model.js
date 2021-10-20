const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AlbumSchema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    url: { type: String, required: true },
    description: { type: String, maxlength: 150 }
})

module.exports = mongoose.model('Album', AlbumSchema)