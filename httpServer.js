var http = require('http')

let object = {
    "userName": "Mohamed",
    "class": 2020          
    };
let object_string = JSON.stringify(object);

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/json'});
    res.end(object_string);
}).listen(8080);