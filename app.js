const express = require("express");
const expresslayouts  = require("express-ejs-layouts");
const connectDb = require('./config/dbconnection')
const fileupload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')


const app = express();
const port = process.env.PORT || 8000;

require('dotenv').config();

app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(expresslayouts);
app.use(cookieParser('FoodBlogSecure'))
app.use(session({
    secret:'FoodBlogSecretSection',
    saveUninitialized:true,
    resave:true

}))
app.use(flash())
app.use(fileupload());


app.set('layout', './layouts/main');
app.set('view engine', 'ejs')
connectDb()

const routes = require('./server/routes/recipeRoutes.js');

app.use('/', routes)


app.listen(port, ()=>
    console.log(`listening to port ${port}`)
)
