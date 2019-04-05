var Api = require("kubernetes/Api").prototype;
var method = ServiceAccounts.prototype = Object.create(Api);

method.constructor = ServiceAccounts;

function ServiceAccounts(server, token, namespace) {
    Api.constructor.apply(this, [{
		apiVersion: "api/v1",
		kind: "serviceaccounts",
		entityBuilder: "kubernetes/builders/api/v1/ServiceAccount"
	}, server, token, namespace]);
}

module.exports = ServiceAccounts;