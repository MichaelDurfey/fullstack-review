const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  login: String,
  url: String,
  stars: Number
});

repoSchema.plugin(uniqueValidator);

// repoSchema.set('toJSON', {getters: true, virtuals: false});

let Repo = mongoose.model('Repo', repoSchema);

let dropData = (callback) => {
  Repo.collection.drop(function(err, done){
    if (err) {
      console.error(err);
    }
  })
}

let findUserData = (user) => {

}

let save = (body, callback) => {
  Repo.create(body, function(err, result){
      if (err){
        handleError(err)
      }
        callback(null, 200)
    });
}

let queryDB = (callback) => {
  var query = Repo.find();
  query.limit(40);
  query.sort('-stars');
  query.select('id name login url stars');
  query.exec(function(err, docs){
    if (err){
      return handleError(err);
    }
    callback(null, docs);
  });
}

exports.save = save;
exports.queryDB = queryDB;
exports.dropData = dropData;


/*Query.prototype.sort()

Parameters

arg «Object,String»
Returns:

«Query» this
Sets the sort order

If an object is passed, values allowed are asc, desc, ascending, descending, 1, and -1.

If a string is passed, it must be a space delimited list of path names. The sort order of each path is ascending unless the path name is prefixed with - which will be treated as descending.

Example

// sort by "field" ascending and "test" descending
query.sort({ field: 'asc', test: -1 });

// equivalent
query.sort('field -test');
Note

Cannot be used with distinct()

*/