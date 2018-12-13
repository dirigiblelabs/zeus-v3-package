var Api = require('kubernetes/Api').prototype;
var method = Pods.prototype = Object.create(Api);

method.constructor = Pods;

function Pods(server, token, namespace) {
    Api.constructor.apply(this, [{
		'apiVersion': 'api/v1',
		'kind': 'pods',
		'entityBuilder': 'kubernetes/builders/api/v1/Pod'
	}, server, token, namespace]);
}

module.exports = Pods;