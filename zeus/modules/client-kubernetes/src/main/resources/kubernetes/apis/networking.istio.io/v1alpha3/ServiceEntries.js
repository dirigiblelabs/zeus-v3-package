var Api = require("kubernetes/Api").prototype;
var method = ServiceEntry.prototype = Object.create(Api);

method.constructor = ServiceEntry;

function ServiceEntry(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "apis/networking.istio.io/v1alpha3",
		kind: "serviceentries",
		entityBuilder: "kubernetes/builders/apis/networking.istio.io/v1alpha3/ServiceEntry"
	}, server, token, namespace]);
}

module.exports = ServiceEntry;