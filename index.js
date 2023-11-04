const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//console.log(process.env);

//Create express server

const app = express();

//DataBase

dbConnection();

//Cors

app.use(cors());

//Public Directory

app.use(express.static('public'));

//Body reading and parsing

app.use(express.json());

//Routes

app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: Events
app.use('/api/events',require('./routes/events'));


// Listen requestes
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});