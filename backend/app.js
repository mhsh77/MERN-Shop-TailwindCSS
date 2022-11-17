const express = require('express')
const app = express();

const errorHandler = require('./middlewares/errors');

app.use(express.json());



//import routes
const products = require('./routes/product');


app.use('/api/v1',products);
app.use(errorHandler);

module.exports = app