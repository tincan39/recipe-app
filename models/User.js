const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    savedRecipes: [String]
});


module.exports = mongoose.model('User', UserSchema);