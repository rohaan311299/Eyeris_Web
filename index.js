// libraries
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require("morgan")
const cookieParser = require("cookie-parser")


// paths 
const connectDB = require('./config/db');


connectDB();
dotenv.config({ path: './config/config.env' });

app.use(morgan('dev'));
app.use(cookieParser());

const server = app.listen(process.env.PORT, () => {
    console.log('App listening on port 5000!'.blue.bold);
});

// Hnadle unhandled promise rejection
process.on('unhandledRejection', (err,promise) => {
    console.log(err.message)
    server.close(() => process.exit(1))
})


