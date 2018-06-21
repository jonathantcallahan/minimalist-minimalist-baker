const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

module.exports = (app, Recipe) => {
    
    app.post('/addrecipe', (req,res) => {
        console.log('request recieved');
        getRecipe(req.body.url)
            .then(body => res.send(body))
            .catch(err => res.status(500).send(err))
    });

    const addToDB = rec => {
        Recipe.find({title:rec.title})
            .then(dbEntry => {
                if(dbEntry == undefined || dbEntry.length == 0){
                    const data = new Recipe(rec);
                    data.save()
                }
            })
    };

    const getRecipe = url => {
        return new Promise(function(resolve,reject){
            request(url, (err,response,body) => {
                    if(!err && response.statusCode == 200){
                    const $ = cheerio.load(body);
                    const image = [];
    
                    // Minimalist Baker
                    // $('noscript').each(function(i, element){
                    //     const nos = $(this);
                    //     const img = nos.children('img')
                    //     //console.log(img.indexOf('data'))
                    //     //img.indexOf('data') == -1 && image.push(img)
                    //     img && image.push(img)
                    // });
                    // console.log(image)
                    // End Minimalist Baker

                    const recipe = {
                        title: $('h1.entry-title').text(),
                        source: url
                    }
                    // console.log($('h1.entry-title').text())
                    addToDB(recipe)
                    console.log(image)
                    resolve(image)
                } else {
                    console.log(response.statusCode)
                    reject(new Error(`An error occured. Status code ${response.statusCode}`))
                }
            })
        })
    }
}