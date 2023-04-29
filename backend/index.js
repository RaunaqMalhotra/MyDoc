const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Parse = require('parse/node');

const app = express();
const apiPort = 9000;

Parse.initialize('flgms9gJdGVz8nwOg5qczmHAAIVARyUaZBQjaPV7', 'oJMbZmCGhxUv8DBqxSKMoz44X2nexHxBNZwr4SSE', 'v7WXKM7FPbPWGc51X5hN6klqU5pMNfjbWdUgkNQj');
Parse.serverURL = 'https://parseapi.back4app.com/';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp().then(
      (user) => {
        console.log('User created successful with name: ' + user.get("username"));
        res.status(201).send('User created successful with name: ' + user.get("username"));
      },
      (error) => {
        console.log("Error: " + error.code + " " + error.message);
        res.status(400).send("Error: " + error.code + " " + error.message);
      }
    );
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    Parse.User.logIn(username, password).then(
      (user) => {
        console.log('User logged in successful with name: ' + user.get("username"));
        res.status(200).send('User logged in successful with name: ' + user.get("username"));
      },
      (error) => {
        console.log("Error: " + error.code + " " + error.message);
        res.status(400).send("Error: " + error.code + " " + error.message);
      }
    );
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));



