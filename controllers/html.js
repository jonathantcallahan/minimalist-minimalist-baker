const path = require('path');

module.exports = app => {
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, './../public/html/index.html'))
    })
    app.get('/recorder', (req,res) => {
        res.sendFile(path.join(__dirname, './../public/html/recorder.html'))
    })
    app.get('/recipes/:id', (req,res) => {
        res.sendFile(path.join(__dirname, './../public/html/recipe.html'))
    })
}