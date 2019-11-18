var bindings = require('zeus-bindings/k8s');
var response = require('http/v4/response');

var api = bindings();
var data = api.list();
response.println(JSON.stringify(data,null,2));
console.info(JSON.stringify(data,null,2));
