const request = require('request');
const cheerio = require('cheerio');

module.exports = app => {
    
    app.post('/addrecipe', (req,res) => {
        console.log('request recieved');
        getRecipe(req.body.url)
            .then(body => res.send(body))
            .catch(err => res.status(500).send(err))
    });

    const getRecipe = url => {
        return new Promise(function(resolve,reject){
            request(url, (err,response,body) => {
                body ? resolve(body) : reject(new Error('The request did not return a body'))
            })
        })
    }
}