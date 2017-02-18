'use strict'

const http = require('http');
// const staticServer = require('node-static');
// const file = new staticServer.Server('.');

const data = require('./data.js');

// http.createServer(function(req, res) {

//   if (req.url === '/hello') {
//     res.writeHead(200, {
//       'Content-Type': 'text/plain',
//       'Cache-Control': 'no-cache'
//     });
//     res.end('Hi!');

//   } else if (req.url === '/photo') {
//     res.writeHead(200, {
//       'Content-Type': 'text/plain',
//       'Cache-Control': 'no-cache'
//     });
//     res.end(JSON.stringify(data.photos));

//   } else {
//     file.serve(req, res);
//   }

// }).listen(3000);

const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.listen(3000);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/photo', (req, res) => {
  res.send(JSON.stringify(data.photos))
});


console.log('Server running on port 3000. Last update was at', new Date().toString());
