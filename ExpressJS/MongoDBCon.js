var exp = require("express");
var app = exp();

var mon = require("mongoose");
var bodyParser = require("body-parser");
var bparseinit = bodyParser.urlencoded({ extended: false });
var cors = require("cors");
app.use(cors());
var result;



mon
  .connect(
    "mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=MongoDBCon"
  )
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(() => {
      console.log("Unable to connect to DB");
  });
//Define the structure of the collection
  const userSchema={UserID:String,Password:String,Email:String};
  //model(<collection name>,<schema>)
  const userData = mon.model("users",userSchema);
  //prepare data to be inserted in to the collection


  userData.find().then((data)=>{
        
    console.log(data)

})


function getAll(req,res)
{
    userData.find().then((data)=>{
        
        console.log(data)
        result=data;
        console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
    })
 
}
app.get("/All",getAll);

function Adduser(request,response){
    var udata=new userData({
        UserID:request.body.uid,
        Password:request.body.password,
        Email:request.body.email
      })
      //use save function to insert the data
      
      udata.save().then((data)=>{
        console.log(data.UserID+data.Password+data.Email+" inserted successfully")
        response.send("<b style='color:green'> Data inserted successfully</b>")
      }).catch((err)=>{
        console.log(err)
      });
}
app.post("/AddUser",bparseinit,Adduser);

function updateuser(req,res) {

  var udata = userData.findOne({UserID:req.body.uid});
    udata.updateOne(  
      {$set:{Password:req.body.password, Email:req.body.email}}
    )
    .then((data) => {
      console.log(data + " updated successfully");
      res.send(data);
    }).catch((err) => {
      console.log(err);
    });
}
app.put("/ModifyUser",bparseinit,updateuser);

function deleteuser(req,res) {
  var udata = userData.findOne({UserID:req.query.uid});
  udata.deleteOne().then((data) => {
    console.log(data + " deleted successfully");
    res.send(data);
  });
}

app.delete("/DeleteUser",deleteuser);

function GetUserById(request, response) {
  let userID = request.query.uid;
  userData.findOne({UserID:userID}).then((data) => {
    console.log(data);
    response.send(data);
  });
}

app.get("/GetUserByID", GetUserById);
function Login(request, response) {
  let userid = request.query.uid;
  let password = request.query.password;
  userData.findOne({UserID: userid, Password: password }).then((data) => {
    console.log(data);
    response.send(data);
  });
}

app.get("/Login",Login);
app.listen(9901, function(error) {
    if (error != undefined) {
      console.log("Error Number : " + error.errno);
      console.log("Error Message : " + error.message);
    }
    else{
    console.log("Server started on port 8000,Waiting for Request");
    console.log("Open the browser and visit http://localhost:8000");
    }
});

