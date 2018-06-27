const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:String,
    source:String,
    images:Array,
    details:String,
    tags:String,
})

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports = Recipe;