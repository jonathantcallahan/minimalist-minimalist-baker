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
                // console.log(err)
                // console.log(response)
                // body ? resolve(body) : reject(new Error('The request did not return a body'))
                if(!err && response.statusCode == 200){
                    const $ = cheerio.load(body);
                    const image = [];
                    $('img').each(function(i, element){
                        const img = $(this).html();
                        console.log(img.indexOf('data'))
                        img.indexOf('data') == -1 && image.push(img)
                    });
                    // console.log(image)
                    const recipe = {
                        title: $('h1.entry-title').text(),
                        source: url
                    }
                    // console.log($('h1.entry-title').text())
                    resolve(image)
                } else {
                    reject(new Error(`An error occured. Status code ${response.statusCode}`))
                }
            })
        })
    }
}