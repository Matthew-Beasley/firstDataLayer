
const express = require('express');
const path = require('path');
const dataLayer = require('./dataLayer');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'data')))
app.use(express.json());

app.get('/companies', async (req, res, next) => {
  try {
    const data = await dataLayer.readCompanies();
    res.send(data.rows);
  }
  catch (ex) {
    res.status(500).send(ex.message);
    next(ex);
  }
});

app.post('/companies', async (req, res, next) => {
  try {

    const data = datalayer.create(req.body)
  }
  catch (ex) {

  }
});

app.listen(PORT, () => console.log('Listening on port ', PORT));
