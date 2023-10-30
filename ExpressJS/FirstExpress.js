//import expressjs
const expr = require("express");
const app = expr();
const bodyParser = require("body-parser");

let bparseinit = bodyParser.urlencoded({ extended: false });
let users = [
  { userID: "101", FirstName: "Sri", LastName: "Vishnu" },
  { userID: "102", FirstName: "Mathan", LastName: "Kumar" },
  { userID: "103", FirstName: "Ashfaq", LastName: "Mohideen" },
];
// function retriveUser(request, response) {
//   let userid = request.query.uid;
//   var status = false;
//   for (var user of users) {
//     if (userid == user.userID) {
//       status = true;
//       break;
//         }
//         if (status) {
//             response.send(user);
//           } else {
//             response.end(
//               "<b>User with ID </b>" + userid + "<br><b>Not Found.</b>"
//             );
//           }
//   }
// }
// app.get("/GetUser", retriveUser);
function GetbyID(request, response) {
  let status = false;

  let userid = request.query.uid;

  for (let user of users) {
    if (userid == user.userID) {
      status = true;

      break;
    }
  }

  if (status) {
    let x =
      "<html><body><h1>Hello " +
      user.FirstName +
      " " +
      user.LastName +
      "</h1></br><h3>Your Details</h3>" +
      "<br><b>UserID</b>: " +
      userid +
      "<br><b>FirstName</b>: " +
      user.FirstName +
      "<br><b>LastName</b>: " +
      user.LastName;
    response.send(x);
  } else {
    response.end("<b>No employee with ID </b>" + userid);
  }
}
app.get("/GetbyID", GetbyID);
function Delete(request, response) {
  let did = request.query.uid;
  for (let i = 0; i < users.length; i++) {
    if (did == users[i].userID) {
      users.splice(i, 1);
    }
    let x = "<html><body><h1>All Users</h1></br><hr>";
    for (let user of users) {
      x +=
        "<br><b>UserID</b>: " +
        user.userID +
        "<br><b>FirstName</b>: " +
        user.FirstName +
        "<br><b>LastName</b>: " +
        user.LastName +
        "<hr>";
    }
    response.send(x);
  }
}
app.get("/DeleteUser", Delete);

function retrieveUser(request, response) {
  let status = false;

  let userid = request.query.uid;
  let username = request.query.uname;

  for (let user of users) {
    if (userid == user.userID && username == user.FirstName) {
      status = true;

      break;
    }
  }

  if (status) {
    x =
      "<html><body><h1>Hello " +
      user.FirstName +
      " " +
      user.LastName +
      "</h1></br><h3>Your Details</h3>" +
      "<br><b>UserID</b>: " +
      userid +
      "<br><b>FirstName</b>: " +
      user.FirstName +
      "<br><b>LastName</b>: " +
      user.LastName;
    response.send(x);
  } else {
    response.end("<b>No employee with ID </b>" + userid);
  }
}

app.get("/getUser", retrieveUser);
function AllUser(request, response) {
  let x = "<html><body><h1>All Users</h1></br><hr>";
  for (let user of users) {
    x +=
      "<br><b>UserID</b>: " +
      user.userID +
      "<br><b>FirstName</b>: " +
      user.FirstName +
      "<br><b>LastName</b>: " +
      user.LastName +
      "<hr>";
  }
  response.send(x);
}
app.get("/AllUser", AllUser);
function AddnewUser(request, response) {
  let userid = request.body.uid;
  let Fname = request.body.Fname;
  let Lname = request.body.Lname;
  let x = "";
  const length = users.length;
  let user = {
    userID: userid,
    FirstName: Fname,
    LastName: Lname,
  };
  users.push(user);
  if (users.length > length) {
    x +=
      "<html><body><h1>User Added Successfully</h1></br><b>Total number of users : " +
      users.length +
      "</b><hr>";
  } else {
    x +=
      "<html><body><h1>User Failed to be added</h1></br><b>Total number of users : " +
      users.length +
      "<hr>";
  }
  response.send(x);
}
app.post("/AddUser", bparseinit, AddnewUser);

function Home(request, response) {
  let x =
    "<html><body><h1>Hello User,Welcome to the ExpressJS Site</h1></br><a href='Welcome'>Click Here</a>";
  response.send(x);
}
app.get("/", Home);

let VisitorCount = 0;
//request represents HTTP request
//response represents HTTP response
function Welcome(request, response) {
  const Today = new Date();
  VisitorCount++;
  let resp = "<html><body><h1>Today:</h1>" + Today;
  resp += "<h1><br/>VisitorCount </h1>:" + VisitorCount;
  resp += "</body></html>";
  response.send(resp);
}
app.get("/Welcome", Welcome);
function Update(request, response) {
  let userid = request.body.uid;
  let Fname = request.body.Fname;
  let Lname = request.body.Lname;

  for (let user of users) {
    if (userid == user.userID) {
      user.FirstName = Fname;
      user.LastName = Lname;
      break;
    }
  }

  response.send("<html><body><h1>User updated successfully</h1></body></html>");
}
app.put("/ModifyUser", bparseinit, Update);
function FeedBack() {
  console.log("Server Started on port 6663");
  console.log("Open the browser and visit http://localhost:6663/AllUser");
}

app.listen(6663, FeedBack);
