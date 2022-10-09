const express = require('express');
const app = express();
const router = express.Router();

let fs = require('fs')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  fs.readFile(__dirname + "/home.html", (err, data) => {
    if (err) throw err

    res.end(data)
  })
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile(__dirname + "/user.json", 'utf-8', (err, data) => {
    console.log(data);
    res.end(data)
  })
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  let username = req.query.username
  let password = req.query.password

  fs.readFile(__dirname + "/user.json", 'utf8', (err, data) => {
    let obj = JSON.parse(data)
    if (username === obj.username && password === obj.password) {
      res.send({
        status: true,
        message: "User Is valid"
      })
    }
    else if (username !== obj.username) {
      res.send({
        status: false,
        message: "User Name is invalid"
      })
    }
    else {
      res.send({
        status: false,
        message: "Password is invalid"
      })
    }
    if (err) throw err
  })
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  let username = req.params.username
  res.send(`<b>${username} successfully logout</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));