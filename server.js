
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
    const data = await dataLayer.createCompany(req.body);
    res.status(200).send(data.rows);
  }
  catch (ex) {
    res.status(500).send(ex.message);
    next(ex);
  }
});


app.put('/companies', async (req, res, next) => {
  try {
    const data = await dataLayer.updateCompany(req.body);
    res.status(200).send(data);
  }
  catch (ex) {
    res.status(500).send(ex.message);
    next(ex);
  }
});


app.delete('/companies', async (req, res, next) => {
  try {
    const response = await dataLayer.deleteCompany(req.body);
    res.status(200).send(response);
  }
  catch (ex) {
    next(ex)
  }
});

app.listen(PORT, () => console.log('Listening on port ', PORT));
