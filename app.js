const createError = require('http-errors');

const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const logger = require('morgan');

const dotenv = require('dotenv')

const exphbs = require('express-handlebars')

const { engine } = require('express-handlebars')



dotenv.config()



const indexRouter = require('./routes/index.router.js');

const authRouter = require('./routes/auth.routes.js');

const userRouter = require('./routes/users.routes.js');

const bootcampRouter = require('./routes/bootcamp.routes.js')

const app = express();



// view engine setup

const handlebars = exphbs.create({

  layoutsDir: path.join(__dirname, 'views'),

  partialsDir: path.join(__dirname, 'views/partials')

});

app.engine(".hbs", engine({ extname: '.hbs' }));

app.set("view engine", "hbs");

app.set('views', path.join(__dirname, 'views'));





app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// exponemos los archivos estáticos

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(express.static(path.join(__dirname, 'node_modules/axios/dist')));

app.use(express.static(path.join(__dirname, 'node_modules/toastr/build')));

app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));





app.use('/', indexRouter);

app.use('/api', authRouter);

app.use('/', userRouter);

app.use('/',bootcampRouter);





// catch 404 and forward to error handler

app.use(function (req, res, next) {

  next(createError(404));

});



// error handler

app.use(function (err, req, res, next) {

  // set locals, only providing error in development

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};



  // render the error page

  res.status(err.status || 500);

  res.render('error');

});



module.exports = app;