var mongoose = require('mongoose');
 
var bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
pswd: String});

var User=mongoose.model('User', bookSchema);
 
module.exports = User;
module.exports.sch = bookSchema;