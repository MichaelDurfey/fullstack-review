const express = require('express');
let app = express();
const db = require('../database/index.js');
// const bodyParse = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body)

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db(function(err, data) {
    if (err) {
      console.error(err)
    }
    console.log('app/get success!!', data)
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

