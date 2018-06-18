const request = require('request');
const cheerio = require('cheerio');

const rRecorder = (url) => {
    request(url, (err, response, body) => {
        if(!err && response.statusCode == 200){
            const $ = cheerio.load(body)
            console.log($)
        }
    })
}