const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apiProject',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
const app = express();

const users = require('./routes/users');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());


//Routes
app.use('/users', users);


//Routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 400;
    next(err);
});


//test

// Catch 404 Errors and forward them to the forward


//Error handler function 
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500;

    //Response to the client
    res.status(status).json({
        error: {
            message: error.message
        }
    })

    //Respond to ourselves
    console.log(err)
})


//Start the serware
const PORT = 4243;
app.listen(PORT, () => console.log(`server is listening on ${PORT}`))