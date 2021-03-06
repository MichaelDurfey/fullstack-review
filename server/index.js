const express = require('express');
let app = express();
const db = require('../database/index.js');
const bodyParser = require('body-parser');
// import getReposByUsername from ('../helpers/github.js');
const { getReposByUsername } = require('../helpers/github.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information freeom the github API, then
  // save the repo information in the database
  let term = req.body.searchTerm;

  let repoResponse = getReposByUsername(term, function(err, data, body) {
    if (err) {
      console.error(err);
    }
    let newBody = JSON.parse(body).map( (item) => {
      let result = {};
      result.id = item.id;
      result.name = item.name;
      result.login = item.owner.login;
      result.url = item.html_url;
      result.stars = item.stargazers_count;
      return result;
    })
    
    db.save(newBody, function(err, users, data){
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    })
  })
  
  //https://api.github.com/users/${name}/repos
});

app.delete('/repos', function(req, res) {
  
  db.dropData()
  res.sendStatus(200)
})

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.queryDB(function(err, data){
    if (err) {
      return handleError(err);
    }
    res.send(data);
  })
});

const port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

