/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
  app       = express(),
  bluemix   = require('./config/bluemix'),
  extend    = require('util')._extend,
  watson    = require('watson-developer-cloud');

// Bootstrap application settings
require('./config/express')(app);

var credentials = extend({
  version: 'v2',
  url: "https://gateway.watsonplatform.net/tone-analyzer-experimental/api",
  username: 'e3982708-ad38-44f5-8ddf-9fdb5aa5a741',
  password: 'cxMenCCKoPyJ'
}, bluemix.getServiceCreds('tone_analyzer'));


// Create the service wrapper
var toneAnalyzer = watson.tone_analyzer(credentials);

// render index page
app.get('/', function(req, res) {
  
//  console.log(req.query.button);
  
  
  res.render('index');
  
  
  
  
});

app.post('/tone', function(req, res, next) {
	console.log(JSON.stringify(req.query));
	console.log(JSON.stringify(req));
  toneAnalyzer.tone(req.body, function(err, data) {
    if (err)
      return next(err);
    else
      return res.json(data);
  });
});

app.get('/synonyms', function(req, res, next) {
  toneAnalyzer.synonym(req.query, function(err, data) {
    if (err)
      return next(err);
    else
      return res.json(data);
  });
});

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
