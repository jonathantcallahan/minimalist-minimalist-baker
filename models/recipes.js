const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:String,
    source:String,
    images:Array,
    tags:String,
    freezer:String,
    fridge:String,
    time:String,
    ingredients:String,
    instructions:String
})

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports = Recipe;