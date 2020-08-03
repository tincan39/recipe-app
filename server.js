const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passportSetup = require('./config/auth');
const dbRoutes = require('./routes/dbQueries');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const imgRoutes = require('./routes/imgUpload');
const fileUpload = require('express-fileupload');



//connect to database
mongoose.connect(require('./config/keys').mongoURI, { promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(console.log('connection successful')).catch(err => console.error(err));

//express object
const app = express();

//logs requests
app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//session for users
app.use(session({
    secret: 'seven-stars',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', authRoutes);
app.use('/db', dbRoutes);
app.use('/img', imgRoutes);

//used to see if a user is authenticated
app.get('/authUser', (req, res) => {
    if (!req.user) {
        res.send({ isAuth: false });
    }
    else {
        res.send({ isAuth: true });
    }
})

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

