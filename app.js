const express = require ('express');
const exphbs  = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const path = require('path');
const env = require('./env');
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));

//Load Routes
const router = require('./config/routes');
const users = require('./config/users');
const api_route = require('./config/api_route');

//Passport Config
require('./config/passport')(passport);

//Connect to Mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//Handlebars Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Static Folder Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Override with Post Middleware
app.use(methodOverride('_method'));

//Express Session Middleware
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
  }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect-Flash Middleware
app.use(flash());

// Global variables
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
  });

//Index Route
app.get('/', (req, res) => {
	const title = 'Welcomes';
	res.render('index', {
		title: title
	});
});

//About Route
app.get('/about', (req, res) => {
	res.render('about');
});

// Use Routes
app.use('/', api_route);
app.use('/ideas', router)
app.use('/users', users);
 
app.listen(port, () => {
	console.log(`Listening on ${port}`);
});