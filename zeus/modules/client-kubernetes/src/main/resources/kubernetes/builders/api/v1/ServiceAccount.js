var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
var method = ServiceAccount.prototype = Object.create(EntityBuilder);

method.constructor = ServiceAccount;

function ServiceAccount() {
	EntityBuilder.constructor.apply(this);

}

this.secrets = [];

method.getSecrets = function() {
	return this.secrets;
};

method.setSecrets = function(secrets) {
	this.secrets = secrets;
};

method.build = function() {
	return {
		apiVersion: "v1",
		kind: "ServiceAccount",
		metadata: EntityBuilder.build.call(this),
		secrets: this.getSecrets()
	};
};

module.exports = ServiceAccount;