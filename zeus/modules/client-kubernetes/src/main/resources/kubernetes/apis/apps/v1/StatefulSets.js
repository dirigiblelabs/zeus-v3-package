var Api = require('kubernetes/Api').prototype;
var method = StatefulSets.prototype = Object.create(Api);

method.constructor = StatefulSets;

function StatefulSets(server, token, namespace) {
    Api.constructor.apply(this, [{
		'apiVersion': 'apis/apps/v1',
		'kind': 'statefulsets',
		'entityBuilder': 'kubernetes/builders/apis/apps/v1/StatefulSet'
	}, server, token, namespace]);
}

module.exports = StatefulSets;