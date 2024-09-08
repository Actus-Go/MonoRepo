require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');
const { port } = keys;
const app = express();
const http = require('http');
const webhook = require('./routes/api/webhook');
const registerHook = require('./routes/api/registerHook');

const server = http.createServer(app);
const io = socket(server);

server.listen(port,'0.0.0.0', () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});


app.use((req, res, next) => {
  try {
    req.io = io;
    next();
  } catch (error) {
    next(error);
  }
});

app.use(webhook);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);



app.use(cors());

app.use(registerHook);

setupDB();
require('./config/passport')(app);
app.use(routes);

const swaggerUi = require("swagger-ui-express");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./swagger")));

module.exports = io;