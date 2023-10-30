const mssql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
let bparseinit = bodyParser.urlencoded({ extended: false });
app.use(express.json());
app.use(cors());
let queryresults;
const con = mssql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "world",
  port: 3306,
});

function CheckConnection(error) {
  if (error != undefined) {
    console.log("Error No. :" + error.errno);
    console.log("Error Message :" + error.message);
  } else {
    console.log("Connected to Database......");
  }
}
con.connect(CheckConnection);

function feedback(error) {
  if (error == undefined) {
    console.log("Server Started on port 9910");
    console.log("Open the browser and visit http://localhost:9901/All");
  } else {
    console.log("Error Number : " + error.errno);
    console.log("Error Message : " + error.message);
  }
}
app.listen(9901, feedback);

function processResults(error, result) {
  queryresults = result;
  console.log("Error: " + error);
  console.log("Result: " + result);
}

function GetAllUsers(request, response) {
  con.connect(CheckConnection);
  con.query("SELECT * FROM Users", processResults);
  response.send(queryresults);
}
app.get("/All", GetAllUsers);
function GetUserById(request, response) {
  let userid = request.query.uid;
  con.query("SELECT * FROM users WHERE UserID = ?", [userid], processResults);
  response.send(queryresults);
  
}
app.get("/GetUserByID", GetUserById);
function insertUser(request, response) {
  let userid = request.body.uid;
  let password = request.body.password;
  let email = request.body.email;
  con.query(
    "INSERT INTO users(UserID,Password,Email) VALUES(?,?,?)",
    [userid, password, email],
    processResults
  );
  response.send(queryresults);
}
let statusMessage = "";
function insertStatus(error) {
  if (error == undefined) {
    statusMessage = "Status: Inserted Successfully";
  } else {
    statusMessage = "Status: Insertion Failed";
  }
}
app.post("/AddUser", bparseinit, insertUser);
function Update(request, response) {
  let userid = request.body.uid;
  let password = request.body.password;
  let email = request.body.email;
  con.query(
    "UPDATE Users SET Password = ?, Email = ? WHERE UserID = ?",
    [password, email, userid],
    processResults
  );
  response.send(statusMessage);
}
app.put("/ModifyUser", bparseinit, Update);
function Delete(request, response) {
  let userid = request.query.uid;
  con.query("DELETE FROM Users WHERE UserID = ?", [userid], processResults);
  response.send(queryresults);
}
app.delete("/DeleteUser", Delete);
function commit(request, response) {
  con.query("commit", processResults);
  console.log("Table Saved");
  response.send(queryresults);
}
app.get("/Commit", commit);
function getAllContacts(request, response) {
  con.connect(CheckConnection);
  con.query("SELECT * FROM Contacts", processResults);
  response.send(queryresults);
}
app.get("/GetAllContacts", getAllContacts);
function addContacts(request, response) {
  let fname = request.body.fname;
  let lname = request.body.lname;
  let email = request.body.emailid;
  let phone = request.body.pno;
  let address = request.body.address;
  con.query(
    "INSERT INTO Contacts(firstName,lastName,mobileNumber,address,email) VALUES(?,?,?,?,?)",
    [fname,lname, phone, address, email],
    processResults
  );
  response.send(queryresults);
}
app.post("/AddContacts", bparseinit, addContacts);
function deleteContacts(request, response) {
  let firstname = request.query.fname;
  con.query("DELETE FROM Contacts WHERE firstName = ?", [firstname], processResults);
  response.send(queryresults);
}
app.delete("/DeleteContacts", deleteContacts);
function updateContacts(request, response) {
  let firstname = request.body.fname;
  let lname = request.body.lname;
  let email = request.body.emailid;
  let phone = request.body.pno;
  let address = request.body.address;
  con.query(
    "UPDATE Contacts SET lastName = ?, mobileNumber = ?, address = ?, email = ? WHERE firstName = ?",
    [lname, phone, address, email, firstname],
    processResults
  );
  response.send(queryresults);
}
app.put("/ModifyContact", bparseinit, updateContacts);

function GetUserByfname(request, response) {
  let firstn = request.query.fname;
  con.query("SELECT * FROM contacts WHERE firstName = ?", [firstn], processResults);
  response.send(queryresults);
  response.send(queryresults);
}
app.get("/GetUserByfname", GetUserByfname);

function Login(request, response) {
  let userid = request.query.uid;
  let password = request.query.password;
  con.query(
    "SELECT * FROM users WHERE UserID = ? AND Password = ?",
    [userid, password],
    processResults
  );
  response.send(queryresults);
}
app.get("/Login",Login);