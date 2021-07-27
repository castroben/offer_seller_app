const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const port = process.env.PORT || 5000;
const URI = process.env.DB_URI;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

mongoose.connect(URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('Connection to MongoDB established successfully');
})

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})