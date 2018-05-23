var Api = require('kubernetes/Api').prototype;
var method = Deployments.prototype = Object.create(Api);

method.constructor = Deployments;

function Deployments(server, token, namespace) {
    Api.constructor.apply(this, [{
		'apiVersion': 'apis/extensions/v1beta1',
		'kind': 'deployments',
		'entityBuilder': 'kubernetes/builders/apis/extensions/v1beta1/Deployment'
	}, server, token, namespace]);
}

module.exports = Deployments;