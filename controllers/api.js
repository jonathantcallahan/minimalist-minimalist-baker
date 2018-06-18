const request = require('request');
const cheerio = require('cheerio');

module.exports = app => {
    
    app.get('/addrecipe', (req,res) => {
        getRecipe(req.body.url)
    });

    const getRecipe = url => {
        
    }
}