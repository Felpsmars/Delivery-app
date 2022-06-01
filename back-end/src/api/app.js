const express = require('express');
require('express-async-errors');
const appRouter = require('./routers');


const app = express();
app.use(express.json());
app.use(appRouter);


/* app.get('/coffee', (_req, res) => res.status(418).end()); */

module.exports = app;
