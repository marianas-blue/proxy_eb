require('newrelic');

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const app = express();

const myProxy = proxy(['/'], {
  target: 'http://localhost:3008',
  changeOrigin: true,
  xfwd: true
});
app.use(myProxy);



app.use(compression());
app.use(cors());

const port = 5000;

app.use(express.static(`${__dirname}/public`))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))