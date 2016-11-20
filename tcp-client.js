'use strict';
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      net = require('net'),
      chalk = require('chalk'),
      HOST = '127.0.0.1',
      API = '/api',
      TCP_CLIENT_PORT = 4001,
      EXPRESS_PORT = 3900;

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

app.post(API, function(req, res, next){
  let client = new net.Socket();
  client.connect(TCP_CLIENT_PORT, HOST, function(err) {
      console.log('\nTCP CONNECTED TO: ' +  chalk.green(HOST + ':' + TCP_CLIENT_PORT));
      if (err)  return next(err);
      console.log('\n' + 'SENT:' + '\n \n' +  req.body.text);
      //client.write(JSON.stringify(req));
      client.write(req.body.text, 'UTF-8');
  });

  client.on('error', function() {
      console.log('Connection error');
      client.destroy();
      res.redirect("/");
  });

  client.on('data', function(data) {
      console.log("Received data!" );
      client.destroy();
      console.log('data: ' + data);
      res.redirect("/");
  });
  res.send('\n\n POST sent to ' + HOST + API + ': \n\n' + req.body.text+'\n\n');
});

app.listen(EXPRESS_PORT);
console.log(chalk.bold('\n Express.js HTTP server started on port ' + EXPRESS_PORT));
