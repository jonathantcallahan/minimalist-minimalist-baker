const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:String,
    source:String,
    images:Array,
    ingredients:String,
    tags:Array,
    instructions:String,
    fridge:String,
    freezer:String
})

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports = Recipe;