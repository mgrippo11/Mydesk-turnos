var createError = require('http-errors');
const express = require('express');
var path = require('path');
const methodOverride = require('method-override');
const cookies = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware')
const app = express();


//Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/auth');
var reservaRouter = require('./routes/reserva');
var puestoRouter = require('./routes/puestos');


//SESSION
app.use(session({key: 'cookie_usuario', secret: 'secret', resave: false, saveUninitialized: false}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');



//Rutas
app.use('/', indexRouter.routes);
app.use('/api', usersRouter.routes);
app.use('/puesto', puestoRouter.routes);
app.use('/login', loginRouter.routes);
app.use('/reserva', reservaRouter.routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});
/*
//rutas de las vistas generales
app.get('/acerca', function(req, res) {
  res.render('/general/sections/about', { });
});
app.get('/contacto', function(req, res) {
  res.render('/general/sections/contact', { });
});
app.get('/guia', function(req, res) {
  res.render('/general/sections/user-guide', { });
});

//rutas de las vistas del usuario común
app.get('/misturnos', function(req, res) {
  res.render('/user/user-reservations', { });
});
app.get('/solicitar',function (req,res){
  res.render('/user/seleccionar-turno',{});
})
app.get('/espacios', function(req, res) {
  res.render('/user/workspaces-list', { });
});
app.get('/miperfil', function(req, res) {
  res.render('/user/user-profile', { });
});

//rutas de las vistas del usuario administrador
app.get('/admin/reservas', function(req, res) {
  res.render('/admin/user-reservations', { });
});
app.get('/admin/usuarios', function(req, res) {
  res.render('/admin/users-list', { });
});
app.get('/admin/nuevoregistro', function(req, res) {
  res.render('/admin/user-registration', { });
});
*/

module.exports = app