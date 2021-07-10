import * as createError from 'http-errors'
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Loop through routes folder and use all routes
var routesPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(routesPath).forEach(function(file:File) {
  let index = require("./routes/" + file);
  app.use("/api/", index)
});

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: Express.Response, next:express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction)  {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Error: " + err)
});

module.exports = app;
