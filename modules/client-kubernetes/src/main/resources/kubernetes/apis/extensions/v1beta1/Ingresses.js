var Api = require('kubernetes/Api').prototype;
var method = StatefulSets.prototype = Object.create(Api);

method.constructor = StatefulSets;

function StatefulSets(server, token, namespace) {
    Api.constructor.apply(this, [{
		'apiVersion': 'apis/extensions/v1beta1',
		'kind': 'ingresses',
		'entityBuilder': 'kubernetes/builders/apis/extensions/v1beta1/Ingress'
	}, server, token, namespace]);
}

module.exports = StatefulSets;