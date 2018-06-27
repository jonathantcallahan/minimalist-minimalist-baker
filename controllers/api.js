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
    
                    // Minimalist Baker image

                    $('p').each(function(i,e){
                        const href = $(this).children('a').attr('href');
                        if(href && href.indexOf('jpg') > -1){ image.push(href) } 
                    })

                    // End Minimalist Baker image

                    const recipe = {
                        title: $('h1.entry-title').text(),
                        source: url,
                        images:image,
                        details:$('div.wprm-recipe-details-container').html(),
                        tags:$('span.wprm-recipe-cuisine').text()
                    }
                    // console.log($('h1.entry-title').text())
                    addToDB(recipe)
                    console.log(image)
                    resolve(recipe)
                } else {
                    console.log(response.statusCode)
                    reject(new Error(`An error occured. Status code ${response.statusCode}`))
                }
            })
        })
    }
}