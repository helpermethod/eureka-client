'use strict';

const Hapi = require('hapi');
const redis = require("redis"), client = redis.createClient({host: "172.17.0.2"});

const useEur = require('./useEur');


client.on("error", function (err) {
  console.log("Error " + err);
});



Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 8000 
});

// Add the route
server.route({
  method: 'POST',
  path:'/likes/objects/{uri}', 
  handler: function (request, reply) {
    client.incr(request.params.uri);
    //    client.set("test", "string val", redis.print);
    return reply(request.params.uri);
  }
});

server.route({
  method: 'GET',
  path:'/likes/objects/{uri}', 
  handler: function (request, reply) {
    client.get(request.params.uri, (err,likes) => {
      if (err) throw (err);
      return reply({likes});        // Kurzschreibweise für {likes:likes}
    });

  }
});


// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

