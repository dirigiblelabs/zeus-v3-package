var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
var method = Secret.prototype = Object.create(EntityBuilder);

method.constructor = Secret;

function Secret() {
	EntityBuilder.constructor.apply(this);

}

method.getType = function() {
	return this.type;
};

method.setType = function(type) {
	this.type = type;
};

method.getData = function() {
	return this.data;	
};

method.setData = function(data) {
	this.data = data;
};

method.build = function() {
	return {
		apiVersion: "v1",
		kind: "Secret",
		metadata: EntityBuilder.build.call(this),
		data: this.getData(),
		type: this.getType()
	};
};

module.exports = Secret;