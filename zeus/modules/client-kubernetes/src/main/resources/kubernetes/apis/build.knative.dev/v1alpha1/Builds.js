var Api = require("kubernetes/Api").prototype;
var method = Builds.prototype = Object.create(Api);

method.constructor = Builds;

function Builds(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "apis/build.knative.dev/v1alpha1",
		kind: "builds",
		entityBuilder: "kubernetes/builders/apis/build.knative.dev/v1alpha1/Build"
	}, server, token, namespace]);
}

module.exports = Builds;