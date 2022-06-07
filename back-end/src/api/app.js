const express = require('express');
const cors = require('cors');
require('express-async-errors');
const appRouter = require('./routers');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(appRouter);

module.exports = app;
