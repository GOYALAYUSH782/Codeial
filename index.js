const express = require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port = 8000;
const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo')(session);
const sassMiddleware= require('node-sass-middleware');
const flash=require('connect-flash');
const customMware= require('./config/middleware');
//require('./config/passport-local-strategy');


//const path = require('path');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: "expanded",
    prefix: '/css'
}));

app.use(express.urlencoded({extended: true})); 

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        { 
            mongooseConnection: db,
            autoRemove: 'disabled' 
        },
        (err)=>{
            console.log(err|| "connect-mongo ok");
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`error in running the server: ${err}`);
        return; 
    }
    console.log(`server is running on port: ${port}`);
});