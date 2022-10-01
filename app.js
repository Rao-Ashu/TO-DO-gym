const express = require ("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];
app.get('/', function(req,res){
  var day = new Date();
  var options = {
    day: "numeric",
    month: "long",
    weekday: "long"
  };

  var today = day.toLocaleDateString("en-US",options);

  res.render('list', {presentDay: today, itemList:items});
});

app.post('/',function(req,res){
  var newItemAdded = req.body.addNew;
  if(newItemAdded.length !=0){
    items.push(newItemAdded);
  }

  res.redirect('/');
});


app.listen(3000);
