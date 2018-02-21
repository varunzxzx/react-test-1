const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

const port = 3000;

dotenv.config();
dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const routes = require('./routes');

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  process.env.NODE_ENV !== "DEVELOPMENT" ? res.send(`<h1>Error Code: ${err.status || 500}</h1>`) : res.send(`<h1>Error Code: ${err.status || 500}</h1><br><p>${err.stack}</p>`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));