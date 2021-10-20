// https://robkendal.co.uk/blog/how-to-build-a-restful-node-js-api-server-using-json-files
const express = require('express')

const app = express();
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 5000;
const dataPath = './data/images_album.json';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// allow to get the image
app.use(express.static('data'))

// get list of albuns
app.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) throw err

        res.send(JSON.parse(data))
    })
})

// get list of images by album
app.get('/:album', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) throw err

        const album = req.params['album']
        res.send(JSON.parse(data)[album])
    })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    // check if data folder exists and create if needed
    if (!fs.existsSync("./data")) {
        console.log("Creating data folder")
        fs.mkdir("./data")
    }
    // check if images_album.json exists and create if needed
    if (!fs.existsSync(dataPath)) {
        console.log("Creating images_album.json")
        fs.writeFile(dataPath, {})
    }
});
