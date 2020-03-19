
var messages = [

];

let requests = {
  messages,

  responseData: function (res, status, headers, data) {
    status = status || 200;
    res.writeHead(status, headers);
    res.end(JSON.stringify(data));
  },
  postReq: function (req, res, status, headers) {
    let getData = '';
    req.on('data', function (data) {
      getData += data;

      messages.push(JSON.parse(getData));

    });
    req.on('end', function (data) {
      res.writeHead(status || 201, headers);

      res.end('done');
    });
  }
};

module.exports = requests;