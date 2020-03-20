
//*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

var { responseData, messages, makeAction } = require('./requestsHandlers');


var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var paths = {
  '/classes/messages': {
    'POST': makeAction,
    'GET': responseData
  }
};


exports.requestHandler = function (request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  var router = paths[request.url][request.method];


  if (!!router) {
    if (request.method === 'GET') {

      router(response, statusCode, headers, { results: messages });

    } else if (request.method === 'POST') {
      router(request, response, 201, headers);
    }

  } else {
    responseData(response, 404, headers, 'router in not defined');
  }


};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.



