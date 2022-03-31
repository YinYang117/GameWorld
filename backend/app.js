const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();
const routes = require('./routes')

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) { app.use(cors()) }; // enable cors only in development
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})); // helmet helps set a variety of headers to better secure your app
app.use( // Set the _csrf token and create req.csrfToken method
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);
app.use(routes);



module.exports = app;