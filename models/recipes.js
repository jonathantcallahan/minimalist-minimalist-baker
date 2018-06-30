const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:String,
    source:String,
    images:Array,
    tags:[String],
    freezer:String,
    fridge:String,
    time:String,
    ingredients:String,
    instructions:String,
    notes:String,
    favorite: {
        type: String,
        default: 'no'
    },
})

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports = Recipe;