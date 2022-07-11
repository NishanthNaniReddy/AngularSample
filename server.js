const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
 
// API file for integrating MongoDB
const dbConnec = require('./db/db_mongo');
 
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/newProject')));
 
// API Location
app.use('/api', dbConnec);
 
// Send all other requists to the Angular app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/newProject/index.html'));
});
 
// Set Port
const port = process.env.PORT || '7000';
app.set(port);
 
const server = http.createServer(app);
 
server.listen(port, ()=>console.log(`Running on localhost:${port}`));