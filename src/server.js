require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

app.use('/', router);


app.set('port', port);
app.listen(port, () => console.log(`listening on port ${port}`));
