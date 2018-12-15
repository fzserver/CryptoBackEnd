/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();
const rp = require('request-promise');


app.get('/', (req, res) => {

var currency = 'USD';
if(req.query.currency != "") { currency = req.query.currency; } else { currency = 'USD'; }

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 20,
    convert: currency
  },
  headers: {
    'X-CMC_PRO_API_KEY': '47c4ba64-5edf-47f0-872e-34c81eeb4cf9'
  },
  json: true,
  gzip: true
};
rp(requestOptions).then(response => {
  res
    .status(200)
    .send(response)
    .end();
}).catch((err) => {
  res
    .status(200)
    .send(err.message)
    .end();
})});

// Info of the crypto currencies
app.get('/cryptoinfo', (req, res) => {

var crypto = req.query.sym;

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
  qs: {
     symbol: crypto
  },
  headers: {
    'X-CMC_PRO_API_KEY': '47c4ba64-5edf-47f0-872e-34c81eeb4cf9'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  res
    .status(200)
    .send(response)
    .end();
}).catch((err) => {
  res
    .status(200)
    .send(err.message)
    .end();
})});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  //console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]