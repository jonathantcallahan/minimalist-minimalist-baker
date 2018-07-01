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

    app.get('/search', (req,res) => {
        let query = req.query.tag;
        query = query.split(',');
        console.log(query)
        Recipe.find({ tags: { $all: query }})
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err))
        
        // res.json(query)
    })

    app.delete('/remove/:id', (req,res) => {
        const id = req.params.id;
        Recipe.remove({ _id:id }, err => err ? 
            res.status(500).json(err):
            res.json('Document successfully removed'
        ))
    })

    app.get('/recipes', (req,res) => {
        Recipe.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err))
    })

    app.get('/recipe-info/:id', (req,res) => {
        Recipe.findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err))
    })

    const getRecipe = url => {
        return new Promise(function(resolve,reject){
            request(url, (err,response,body) => {
                    if(!err && response.statusCode == 200){
                    const $ = cheerio.load(body);
                    const image = [];
    
                    // Minimalist Baker image

                    $('p').each(function(i,e){
                        const href = $(this).children('img').attr('src');
                        if(href && href.indexOf('jpg') > -1){ image.push(href) } 
                    })

                    // End Minimalist Baker image ↵

                    const tags = $('span.wprm-recipe-cuisine').text().substring(1).trim().split(',');
                    tags.forEach((e,i) => {
                        tags[i] = e.trim()
                    })
                    console.log(tags)

                    const recipe = {
                        title: $('h1.entry-title').text(),
                        source: url,
                        images:image,
                        ingredients:$('div.wprm-recipe-ingredients-container').html(),
                        instructions:$('div.wprm-recipe-instructions-container').html(),
                        tags:tags,
                        freezer:$('span.wprm-recipe-freezer-friendly').text().substring(1).trim(),
                        fridge:$('span.wprm-recipe-does-it-keep').text().substring(1).trim(),
                        time:$('span.wprm-recipe-total_time-minutes').text(),
                        notes:$('div.wprm-recipe-notes-container').html(),
                    }
                    recipe.title.length > 1 && addToDB(recipe)
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