var mongoose = require('mongoose');
var env= require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`, {useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

db.once('open', function() {
  console.log('connected to the database:: MongoDB')
});

module.exports=db;