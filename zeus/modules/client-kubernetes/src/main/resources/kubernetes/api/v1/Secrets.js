var Api = require("kubernetes/Api").prototype;
var method = Secrets.prototype = Object.create(Api);

method.constructor = Secrets;

function Secrets(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "api/v1",
		kind: "secrets",
		entityBuilder: "kubernetes/builders/api/v1/Secret"
	}, server, token, namespace]);
}

module.exports = Secrets;