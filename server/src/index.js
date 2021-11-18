const express = require('express')
const cors = require('cors')

const app = express()

const hostname = '0.0.0.0'
const port = 5000

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
