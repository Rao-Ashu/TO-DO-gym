const express = require ("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];
var setCount = [];
app.get('/', function(req,res){
  var day = new Date();
  var options = {
    day: "numeric",
    month: "long",
    weekday: "long"
  };

  var today = day.toLocaleDateString("en-US",options);

  res.render('list', {presentDay: today, itemList:items, setList:setCount});
});

app.post('/',function(req,res){
  console.log(req.body);
  var newItemSetCount = req.body.setNo;
  var newItemAdded = req.body.addNew;
  if(newItemAdded.length !=0){
    items.push(newItemAdded);
  }
  if(newItemSetCount >0){
    setCount.push(newItemSetCount);
  }else if (newItemSetCount <=0) {
    setCount.push('0');
  }


  // RESETbtn
  if(req.body.reset === ''){
    setCount = [];
    items = [];
  }

  // DELETEbtn
  // if(req.body.delete===''){
  //
  // }

  res.redirect('/');
});


app.listen(3000);
