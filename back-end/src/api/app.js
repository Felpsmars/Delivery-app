const express = require('express');
const cors = require('cors');
require('express-async-errors');
const appRouter = require('./routers');

const app = express();
app.use(express.json());
app.use(cors());
app.use(appRouter);

/* app.get('/coffee', (_req, res) => res.status(418).end()); */

module.exports = app;
