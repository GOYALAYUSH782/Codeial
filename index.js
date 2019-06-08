const express = require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port = 8000;
const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//const path = require('path');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));

app.use(express.static('./assets'));

app.set('view engine','ejs');

app.set('views','./views');

app.listen(port,(err)=>{
    if(err){
        console.log(`error in running the server: ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
});
