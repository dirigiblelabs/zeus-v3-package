var Api = require('kubernetes/Api').prototype;
var method = Services.prototype = Object.create(Api);

method.constructor = Services;

function Services(server, token, namespace) {
    Api.constructor.apply(this, [{
		'apiVersion': 'api/v1',
		'kind': 'services',
		'entityBuilder': 'kubernetes/builders/api/v1/Service'
	}, server, token, namespace]);
}

module.exports = Services;