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
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const dotenv = require('dotenv').config();

let mongoURI;//enviorment variables are used if in production
// if (process.env.mongoURI) {
//     mongoURI = process.env.mongoURI;
// }
// else {
//     mongoURI = require('./config/keys').mongoURI;
// }
//connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology:true })
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
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 30000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    rolling: true
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api', authRoutes);
app.use('/api/db', dbRoutes);
app.use('/api/img', imgRoutes);

//used to see if a user is authenticated
app.get('/api/authUser', (req, res) => {
    if (!req.user) {
        res.send({ isAuth: false });
    }
    else {
        res.send({ isAuth: true });
    }
})


app.get("/", (req, res) =>{
    res.json({message:"docker is tough"})
})


/* 

let me tell you the tale of how true men test in prod
bigger changess
ja na nan an
ja nana nana
*/
console.log("these nuts");
// //if in production, it executes
// if (process.env.NODE_ENV === 'production') {
//     //set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000;
console.log(app._router.stack);

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

