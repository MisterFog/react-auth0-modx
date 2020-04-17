const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const movieRouter = require('./router');

/* express */
const app = express();
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`));

// Alow cross-arogon
app.use(cors());

/* add routes */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Routers */
app.use('/api', movieRouter);

/* вкл. мониторинг состояния подключения к БД */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
