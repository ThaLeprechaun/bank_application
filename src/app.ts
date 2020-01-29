import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import transactionsRouter from './routes/transactions';

const app = express();
app.use(cors());
// view engine setup
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transactions', transactionsRouter);

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   }),
// );

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err: Error,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((<any>err).status || 500);
  res.render('error');
});

export default app;
