const express = require('express')
const post=8000;
const collection=require('./db');
require('./models/User');
const authR=require('./routes/AuthRoute');
const requiredToken=require('./middleware/AuthToken');

const app= express();
const bodyParser = require('body-parser');
app.use(authR);
app.use(bodyParser.json());
app.get('/',requiredToken,async(req,res)=>{
    console.log(req.user);
    res.send(req.user)
})
app.listen(post,()=>{
    console.log('Server is running ',post);
})