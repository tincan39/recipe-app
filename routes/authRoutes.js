const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');


/**
 * Route for login
 * 
 * Passport middlewares checks to see if credentials are valid
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        res.send({ isAuth: true, user: { username: req.user.username, id: req.user._id, savedRecipes: req.user.savedRecipes } });
    }
    else {
        res.send({ isAuth: false });
    }

});

//route for user registration
router.post('/register', async (req, res) => {

    console.log(req.body);

    //password given is hashed
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            res.status(400).send({ message: "Username taken" })
        }
        else {

            //a new user is created in the database

            new User({
                username: req.body.username,
                password: hash,
                savedRecipes: []

            }).save().then((user) => { console.log(user) });

            res.send("done");

        }
    })

});

router.get('/logout', (req, res) => {
    req.logOut();
    res.send('done');
})

module.exports = router;
