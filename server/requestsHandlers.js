
var messages = [

];

let requests = {
  messages,

  responseData: function (res, status, headers, data) {
    status = status || 200;
    res.writeHead(status, headers);
    res.end(JSON.stringify(data));
  },
  makeAction: function (req, res, status, headers) {
    let getData = '';
    let length = messages.length + 1;

    req.on('data', function (data) {
      getData = JSON.stringify(data + '');

      messages.unshift(JSON.parse(getData));

    });
    req.on('end', function (data) {

      requests.responseData(res, status, headers, { result: length });

    });
  }
};

module.exports = requests;