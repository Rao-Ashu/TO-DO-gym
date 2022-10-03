const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

var items = [];
var setCount = [];
app.get('/', function(req, res) {
  var day = new Date();
  var options = {
    day: "numeric",
    month: "long",
    weekday: "long"
  };

  var today = day.toLocaleDateString("en-US", options);

  res.render('list', {
    presentDay: today,
    itemList: items,
    setList: setCount
  });
});

app.post('/', function(req, res) {

  // new_items
  var newItemSetCount = req.body.setNo;
  var newItemAdded = req.body.addNew;

  if (newItemAdded.length != 0) {
    items.push(newItemAdded);
  }


  if (newItemSetCount > 0) {
    setCount.push(newItemSetCount);
  } else if (newItemSetCount <= 0) {
    setCount.push('0');
  }


  // RESETbtn
  if (req.body.resetbtn === '') {
    setCount = [];
    items = [];
  }

  // DELETEbtn
  if (req.body.delete) {
    // var a = document.getElementById("button");
    // console.log(a);
    // console.log(req.body);

    const index = items.indexOf(req.body.delete);
    if (index > -1) { // only splice array when item is found
      items.splice(index, 1);
      setCount.splice(index, 1);
    }
  }

  res.redirect('/');
});


app.listen(process.env.PORT || 3000);
