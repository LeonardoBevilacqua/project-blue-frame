const express = require('express')
const mongoose = require('mongoose')

const app = express()

const mongoUrl = 'mongodb://localhost:27017/blueFrame'
const hostname = '127.0.0.1'
const port = 5000

let mongoDB = process.env.MONGODB_URI || mongoUrl
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'Error while connecting to MongoDB'))

app.use(express.json())
app.use(express.urlencoded())

// routes
app.use('/albums', require('./routes/albums.route'))

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
