var Api = require("kubernetes/Api").prototype;
var method = VirtualService.prototype = Object.create(Api);

method.constructor = VirtualService;

function VirtualService(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "apis/networking.istio.io/v1alpha3",
		kind: "virtualservices",
		entityBuilder: "kubernetes/builders/apis/networking.istio.io/v1alpha3/VirtualService"
	}, server, token, namespace]);
}

module.exports = VirtualService;