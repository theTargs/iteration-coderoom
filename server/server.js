const express = require('express');
const app = express();
const path = require('path');
const userController = require('./../controller/userController');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080;
// const port = 8080;


//redirect after successful login
const redirect = (req, res) => res.send(true);


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(express.static(path.join(__dirname, 'build')));


app.post('/', userController.checkExisting, userController.createUser);
app.post('/login', userController.verifyUser, /*cookieController.setSSIDCookie,*/ /*sessionController.startSession,*/ redirect );

app.get('/', (req, res) => {res.sendFile(__dirname + '/build/index.html')});

app.get('/game', (req, res) => {res.sendFile(__dirname + '/build/game.html')});


app.get('/win', (req, res) => {res.sendFile(__dirname + '/build/win.html')});

app.get('/lose', (req, res) => {res.sendFile(__dirname + '/build/lose.html')});

app.get('/fonts/Wargames.woff', (req, res) => res.sendFile(__dirname + '/fonts/Wargames.woff'));


app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));

