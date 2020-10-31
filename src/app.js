const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRouter = require('./routes');
const accountsRouter = require('./routes/accounts');
const swaggerConfig = require('./swagger/swaggerConfig');
const connectDB = require('./database/dbConnect');
require('./config/config');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);

swaggerConfig(app);

module.exports = app;
