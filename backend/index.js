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
            res.status(200).json({ message: 'User logged in successful with name: ' + user.get("username") }); 
        },
        (error) => {
            console.log("Error: " + error.code + " " + error.message);
            res.status(400).json({ error: "Error: " + error.code + " " + error.message }); 
        }
    );
});

app.post('/savePersonalInfo', async (req, res) => {
    const { username, fullName, age, height, weight, gender, sexuality, race, currentMedications } = req.body;

    const User = Parse.Object.extend("Profile");
    const query = new Parse.Query(User);
    query.equalTo("username", username);
    
    try {
        const user = await query.first();
        
        if(user) {
            user.set("fullName", fullName);
            user.set("age", age);
            user.set("height", height);
            user.set("weight", weight);
            user.set("gender", gender);
            user.set("sexuality", sexuality);
            user.set("race", race);
            user.set("currentMedications", currentMedications);

            await user.save();

            res.status(200).json({ message: 'User info updated successfully with username: ' + user.get("username") }); 
        } else {
            const newUser = new User();

            newUser.set("username", username);
            newUser.set("fullName", fullName);
            newUser.set("age", age);
            newUser.set("height", height);
            newUser.set("weight", weight);
            newUser.set("gender", gender);
            newUser.set("sexuality", sexuality);
            newUser.set("race", race);
            newUser.set("currentMedications", currentMedications);

            await newUser.save();

            res.status(200).json({ message: 'User info saved successfully with username: ' + newUser.get("username") }); 
        }
    } catch (error) {
        console.log("Error: " + error.code + " " + error.message);
        res.status(400).json({ error: "Error: " + error.code + " " + error.message }); 
    }
});

app.post('/saveSymptoms', async (req, res) => {
    const { username, symptoms, duration, severity, imageUpload } = req.body;

    const sym = Parse.Object.extend("Symptoms");
    const query = new Parse.Query(sym);
    query.equalTo("username", username);
    
    try {
        const user = await query.first();
        
        if(user) {
            user.set("symptoms", symptoms);
            user.set("duration", duration);
            user.set("severity", severity);

            if (imageUpload) {
                const file = new Parse.File(imageUpload.name, { base64: imageUpload.base64 });
                user.set("imageUpload", file);
            }

            await user.save();

            res.status(200).json({ message: 'User symptoms updated successfully with username: ' + user.get("username") }); 
        } else {
            const newUser = new sym();

            newUser.set("username", username);
            newUser.set("symptoms", symptoms);
            newUser.set("duration", duration);
            newUser.set("severity", severity);

            if (imageUpload) {
                const file = new Parse.File(imageUpload.name, { base64: imageUpload.base64 });
                newUser.set("imageUpload", file);
            }

            await newUser.save();

            res.status(200).json({ message: 'User symptoms saved successfully with username: ' + newUser.get("username") }); 
        }
    } catch (error) {
        console.log("Error: " + error.code + " " + error.message);
        res.status(400).json({ error: "Error: " + error.code + " " + error.message }); 
    }
});

const { spawn } = require('child_process');

app.post('/predict', (req, res) => {
    const { symptoms } = req.body;

    const symptomsArray = Array.isArray(symptoms) ? symptoms : [symptoms];
    const python = spawn('python', ['./model1.py', JSON.stringify(symptomsArray)]);

    let dataString = '';

    python.stdout.on('data', function (data) {
        dataString += data.toString();
    });

    python.on('close', function (code) {
        if (code !== 0) {
            return res.status(500).json({ error: "Failed to run python script" });
        }

        const result = JSON.parse(dataString);
        return res.status(200).json(result);
    });
});


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));



