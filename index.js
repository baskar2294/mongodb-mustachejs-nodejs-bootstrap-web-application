var express=require("express");
var mustache=require("mustache");
   var mongoose=require("mongoose");
var User = require('./public/model/user');

    port = process.env.PORT || 2595;
var path = require('path');
	fs = require('fs'); // bring in the file system api
var bookings = [];
var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
db = mongoose.createConnection('mongodb://localhost:27017/mongoose_basics');
var cModel=db.model("user",User.sch);

db.on('error', function(err){
  if(err) throw err;
});

db.once('open', function callback () {
  console.info('Mongo db connected successfully');
});
app.post('/action', function (req, res) {
    console.log(req.body);
    var page = fs.readFileSync(path.join(__dirname + '/public/view/tmpl/card.html'), "utf8"); // bring in the HTML file
	var html = mustache.to_html(page, req.body); // replace all of the data
    /*mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
    if (err) throw err;*/
	var newuser=new cModel({_id: new mongoose.Types.ObjectId(),email:req.body.email,pswd:req.body.pswd});
    
    newuser.save(function(err) {
        if (err) throw err;
         
        console.log('User successfully saved.');
    });
    //});
	res.send(html); // send to client
    //res.sendFile(path.join(__dirname + '/public/view/tmpl/index.html'));
    
});
app.listen(port);
console.log('Express server running at http://localhost:' + port);