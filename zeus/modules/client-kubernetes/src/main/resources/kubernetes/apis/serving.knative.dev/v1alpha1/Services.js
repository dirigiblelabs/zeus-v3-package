var Api = require("kubernetes/Api").prototype;
var method = Services.prototype = Object.create(Api);

method.constructor = Services;

function Services(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "apis/serving.knative.dev/v1alpha1",
		kind: "services",
		entityBuilder: "kubernetes/builders/apis/serving.knative.dev/v1alpha1/Service"
	}, server, token, namespace]);
}

module.exports = Services;