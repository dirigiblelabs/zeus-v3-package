var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
var method = ConfigMap.prototype = Object.create(EntityBuilder);

method.constructor = ConfigMap;

function ConfigMap() {
	EntityBuilder.constructor.apply(this);
}

method.getData = function() {
    return this.data;
};

method.setData = function(data) {
    this.data = data;
};

method.build = function() {
	return {
		apiVersion: "v1",
		kind: "ConfigMap",
		metadata: EntityBuilder.build.call(this),
        data: this.getData()
	};
};

module.exports = ConfigMap;