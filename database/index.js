const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  Id: Number,
  name: String,
  login: String,
  url: String,
  pushed_at: String,
  starsCount: Number
});

repoSchema.set('toJSON', {getters: true, virtuals: false});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

let queryDB = (callback) => {
  const query = Repo.find();
  query.sort({starsCount: -1})
  
}

module.exports.save = save;

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