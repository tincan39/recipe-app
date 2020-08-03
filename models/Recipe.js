const mongoose = require('mongoose');

const Step = new mongoose.Schema({
    spot: Number,
    step: String
});

const RecipeSchema = new mongoose.Schema({
    id: String,
    name: String,
    lowerName: String,
    description: String,
    steps: [Step],
    imgUrl: String,
    userId: String
})


module.exports = mongoose.model('Recipe', RecipeSchema);