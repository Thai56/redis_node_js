const redis = require('redis');
const client = redis.createClient({ host: 'redis' });
const express = require("express");
const app = express();
const port = 8001;

client.on('error', function(err) {
  console.log('There was an error ', err);
});

client.set('hits', 0, redis.print);
client.set('page1', 0, redis.print);
client.set('page2', 0, redis.print);

app.get('/', (err, res) => {
  client.incr('hits', function(err, hits) {
    res.status(200).send(`This page has been visited ${hits} times!`);
  });
});

app.get('/1', (err, res) => {
  client.incr('page1', function(err, page1) {
    res.status(200).send(`hello world! Welcome to page 1! You have visisted ${page1} times`);
  });
});

app.get('/2', (err, res) => {
  client.incr('page2', function(err, page1) {
    res.status(200).send(`hello world! Welcome to page 2! You have visisted ${page1} times`);
  });
});

app.listen(port, () => console.log('Now listening on port ', port));
