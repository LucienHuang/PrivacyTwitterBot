var TwitterPackage = require('twitter');

var secret = {
	consumer_key:'UJMg4AjB9a3zEVtfXqZdjL7Z4',
	consumer_secret:'FhkltZ9TTiYAwHOaBw1uOPwoLg5go8YFSgJskBeK2yhHJfeBJJ',
	access_token_key:'831634641320833024-NCj9kEbwZo8ZCG9GxS9kYUOfQRZNKnS',
	access_token_secret:'uLF2482bIYgddbgNiZbhItsoArqPbWPYh1y63rfWlKfnh'
}

var Twitter = new TwitterPackage(secret);

var tweeting = function(content){
    Twitter.post('statuses/update', {status: ''},  function(error, tweet, response){
    if(error){
      console.log(error);
    }
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
  });
}

var io = require('socket.io').listen(1180); // initiate socket.io server

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' }); // Send data to client

  // wait for the event raised by the client
  socket.on('my other event', function (data) {  
    var s = data;
    Twitter.post('statuses/update', {status: s.my},  function(error, tweet, response){
    if(error){
      console.log(error);
    }
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
    console.log(s);
  });
  });
});

var http = require('http'),
    fs = require('fs');

fs.readFile('./untitled.html', function (err, html) {
    if (err) {
        throw err;
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});