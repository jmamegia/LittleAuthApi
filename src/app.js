const express = require('express');
const app = express();
const cors = require('cors')

const port = process.env.APP_PORT || 4000;

//settings
app.set('port', port);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/auth', require('./routes/auth'))
module.exports = app;