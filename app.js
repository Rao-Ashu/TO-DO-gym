const express = require("express");
const bodyParser = require("body-parser");

//DATABASE require and connection
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-ashu:Ashuatlas@cluster0.0wu4yqu.mongodb.net/todoDB");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


// DATABASE Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  set: Number,
});

const Item = new mongoose.model("Item", itemSchema);





app.get('/', function(req, res) {

  //today date
  var day = new Date();
  var options = {
    day: "numeric",
    month: "long",
    weekday: "long"
  };

  var today = day.toLocaleDateString("en-US", options);


  // NEW EXERCISES
  Item.find({}, function(err,databaseList) {
      res.render('list', {presentDay: today, itemList: databaseList});
  })
});






app.post('/', function(req, res) {

      // new_items
      var newItemSetCount = req.body.setNo;
      var newItemAdded = req.body.addNew;

      if (newItemAdded.length != 0 && newItemSetCount > 0) {
        const ex1 = new Item({
          name: newItemAdded,
          set: newItemSetCount
        });
        ex1.save();
        res.redirect("/");
      } else if (newItemAdded.length != 0 && newItemSetCount <= 0) {
        const ex1 = new Item({
          name: req.body.addNew,
          set: 0
        });
        ex1.save();
        res.redirect("/");
      }else{
        res.redirect("/");
      }




      // RESETbtn
      if (req.body.resetbtn === '') {
        Item.deleteMany({},function(err){
          if(!err){
            //console.log("Successfully deleted whole collection.");
            // res.redirect("/");
          }
        });
      }

      // DELETEbtn
      if (req.body.delete) {
        Item.findByIdAndRemove(req.body.delete, function(err){
          if (!err) {
            //console.log("Successfully deleted checked item.");
            // res.redirect("/");
          }
        });
      };
});





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3002;
}
app.listen(port);
