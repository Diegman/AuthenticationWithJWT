const authRoutes = require('./Routes/authRoutes'); 
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

//DB Connection

const dbURI = 'mongodb+srv://dbUserDiegman:foreveralone1@cluster0.oknri.mongodb.net/node-auth';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));


//Routes

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);





