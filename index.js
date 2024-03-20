const express = require('express');
const config = require('./config.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
const creds = require('./cred.json');
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];
const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: SCOPES,
  });
const doc = new GoogleSpreadsheet(config.docId, serviceAccountAuth);
(async () => {
    await doc.loadInfo();
})();

const sheets = require('./utils/googlesheets');
app.get('/setdata', async(req, res) => {
    await fetch(`https://api.thingspeak.com/update?api_key=20XUHYRVVXQB9K29&field1=${req.query.temp}&field2=${req.query.humid}&field3=${req.query.soil_temp}&field4=${req.query.soil_humid}&field5=${req.query.soil_ph}`);
    await sheets.setdata(req, res, doc);
    console.log(req.query)
})
app.listen(4000);