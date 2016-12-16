const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const app = express();


app.get('/', (req, res) => {
  res.send('you found me!');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`app listen on ${process.env.PORT} || 8080`);
});
