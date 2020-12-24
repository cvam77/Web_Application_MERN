
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();


const url = process.env.NODE_ENV == 'production' ? '' : ''

mongoose.connect(url, {useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

/*
const User = require('./models/User');

const userInput = {
    username : "heroku",
    password: "heroku"
}

const user = new User(userInput);
user.save((err,document) => {
    if(err)
        console.log(err);
    console.log(document);
})
*/


// UrlService.getListUrlKeyword().then(data=>{
//     console.log('calling get listurlkeyword \n');
//     console.log(data.LinkKeyword);
//     setListUrlKeyword(data.LinkKeyword);
// });

app.listen(process.env.PORT,()=>{
    console.log('express server started');
}); 

