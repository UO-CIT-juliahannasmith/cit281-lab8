/*
    CIT 281 Lab 8
    Name: Julia Smith
*/

// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require("fastify")();

// #2 TODO: Declare fetch object from node-fetch
const fetch = require("node-fetch");

fastify.get("/fotos", (request, reply) => {
  // 1) get request
  // 2) do something
  //      a1) get the JSON data from other server
  //      b) process that data
  // 3) provide a reply to the client
  //      a2) if ther were hiccups in getting the data, provide a diff response

  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => {
      return response.json();
    })
    .then((jsonFromResponse) => {
      reply
        .code(200)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 200, photos: jsonFromResponse });
    })
    .catch((err) => {
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 404, photos: [] });
    });

  // #3 TODO:
  // Adapt the following code to attempt to retrieve
  // all photos from JSONPlaceholder site
  // using fetch, and handle returned Promise using:
  // - two .then() chain methods, return 200
  // - single .catch() chain method, return 404
});

fastify.get("/fotos/:id", (request, reply) => {
  // #4 TODO:
  // Adapt the following code to attempt to retrieve
  // a single photo from JSONPlaceholder site
  // using fetch, and handle returned Promise using:
  // - single .then() chain method, return 200
  // - single .catch() chain method, return 404
  // You may also try to use Object.keys() to
  // ensure JSONPlaceholder returns an object with
  // properties. An empty object returned from
  // JSONPlaceholder means that the passed photo ID
  // was invalid. Your server would also return
  // a 404 status code for an invalid Photo ID.

  // 1) get information from client
  const { id = "" } = request.params;
  //2) take action

  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((response) => {
      return response.json();
    })
    //3) reply to client
    .then((jsonFromResponse) => {
      reply
        .code(200)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 200, photos: jsonFromResponse });
    })
    .catch((err) => {
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 404, photos: [] });
    });
});

fastify.get("/fotosview/:id", (request, reply) => {
  // #4 TODO:
  // Adapt the following code to attempt to retrieve
  // a single photo from JSONPlaceholder site
  // using fetch, and handle returned Promise using:
  // - single .then() chain method, return 200
  // - single .catch() chain method, return 404
  // You may also try to use Object.keys() to
  // ensure JSONPlaceholder returns an object with
  // properties. An empty object returned from
  // JSONPlaceholder means that the passed photo ID
  // was invalid. Your server would also return
  // a 404 status code for an invalid Photo ID.

  // 1) get information from client
  const { id = "" } = request.params;
  //2) take action

  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((response) => {
      return response.json();
    })
    //3) reply to client
    .then((jsonFromResponse) => {
      reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(
          `<html><body><h1>${jsonFromResponse.title}<h1><img src='${jsonFromResponse.url}'/></body></html>`
        );
    })
    .catch((err) => {
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 404, photos: [] });
    });
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
