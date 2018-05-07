const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const hbs = require('hbs')
require('dotenv').config();
require('express-async-errors');

const oidc = require('./service/okta/oktaMiddleware');

// Create a new Express application.
var app = express();

// view engine setup (Handlebars)
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));

// register handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

// Use application-level middleware for common functionality, including parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

// okta oidc middleware
app.use(oidc.router);

// load controllers & routes
app.use(require('./controllers'));

// error handling
app.use((err, req, res, next) => {
	console.log(err);
	res.render('pages/error', { error: err});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
