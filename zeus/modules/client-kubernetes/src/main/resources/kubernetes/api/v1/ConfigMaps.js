var Api = require("kubernetes/Api").prototype;
var method = ConfigMaps.prototype = Object.create(Api);

method.constructor = ConfigMaps;

function ConfigMaps(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "api/v1",
		kind: "configmaps",
		entityBuilder: "kubernetes/builders/api/v1/ConfigMap"
	}, server, token, namespace]);
}

module.exports = ConfigMaps;