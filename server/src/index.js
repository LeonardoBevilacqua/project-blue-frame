const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

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
app.use(express.urlencoded({ extended: false }))
// cors
app.use((req, res, next) => {
    // permission
    res.header("Access-Control-Allow-Origin", "*")
    // methods
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    app.use(cors())
    next()
})

// routes
const albums = require('./routes/albums.route')
app.use('/albums', albums)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
