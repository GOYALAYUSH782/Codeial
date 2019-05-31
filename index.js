const express = require('express');
const app=express();
const port = 8000;
const path = require('path');

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`error in running the server: ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
});
