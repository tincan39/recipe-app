const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const mongoose = require('mongoose');

//retrieves recipe items
router.get('/get', async (req, res) => {
    let recipes = {};
    recipes.myRecipes = await Recipe.find({ userId: req.query.uid }, '_id name');
    let savedKeys = await User.findById(req.query.uid, 'savedRecipes');
    savedKeys = savedKeys.savedRecipes;
    if (savedKeys) {
        recipes.savedRecipes = await Recipe.find({
            _id: {
                $in: savedKeys.map(val => mongoose.Types.ObjectId(val))
            }
        }, '_id name');
    }
    else {
        recipes.savedRecipes = [];
    }
    res.send(recipes);
});

//retrieves a single recipe item
router.get('/getOne', (req, res) => {

    console.log(req.query.id);

    Recipe.findById(req.query.id).then((recipe) => {
        if (!recipe) {
            res.status(400).send({ message: 'recipe could not be found' });
        }
        else {
            res.send(recipe);
        }
    })
});

//search results for when a user searches for a recipe
router.get('/search', (req, res) => {
    Recipe.find({ lowerName: req.query.item.toLowerCase() }).then(recipes => {
        let filtItems = recipes.filter(item => item.userId !== req.query.uid); //excludes the recipes made by the user
        res.send(filtItems);
    });
});

//creates a recipe item
router.post('/create', (req, res) => {


    new Recipe({
        name: req.body.name,
        lowerName: req.body.name.toLowerCase(),
        description: req.body.description,
        steps: req.body.steps,
        imgUrl: req.body.imgUrl,
        userId: req.body.userId
    }).save();
    res.send("done");
});

//updates a recipe item
router.post('/edit', (req, res) => {

    Recipe.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        description: req.body.description,
        steps: req.body.steps,
        imgUrl: req.body.imgUrl,
        userId: req.body.userId,
        lowerName: req.body.name.toLowerCase()
    }, (err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.send("done");
        }
    });



});

//deletes a recipe item
router.delete('/delete', (req, res) => {
    Recipe.findByIdAndDelete(req.query.id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send('done');
        }
    });
});

//alows the user to save another user's recipe for viewing
router.post('/save', (req, res) => {
    User.findByIdAndUpdate(req.body.uid, {
        $addToSet: { savedRecipes: req.body.recipeId }
    }, { new: true }, (err, doc) => {
        if (err) {
            res.status(400).send("error")
        }
        else {
            console.log(doc);
            res.send({ user: { username: doc.username, id: doc._id, savedRecipes: doc.savedRecipes } });
        }
    });


});

//unsaves another user's recipe
router.post('/unsave', (req, res) => {

    User.findByIdAndUpdate(req.body.uid,
        { $pull: { savedRecipes: req.body.recipeId } }
        , { new: true }, (err, doc) => {
            if (err) {
                res.status(400).send("error")
            }
            else {
                console.log(doc);
                res.send({ user: { username: doc.username, id: doc._id, savedRecipes: doc.savedRecipes } });
            }
        });

});

module.exports = router;