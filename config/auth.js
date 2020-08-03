const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/User');



passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => {
        if (err) {
            return done(err);
        }
        done(null, user);
    })
})


passport.use(new LocalStrategy(
    async (username, password, done) => {
        User.findOne({ username: username }).then(async (user) => {
            if (!user) {
                return done(null, false);
            }
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false);

        }).catch(err => {
            return done(err)
        });
    }
))