var EntityBuilder = require('kubernetes/builders/EntityBuilder').prototype;
var method = Service.prototype = Object.create(EntityBuilder);

method.constructor = Service;

function Service() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
}

method.getSpec = function() {
	return this.spec;	
};

function Spec() {

	this.ports = [];

	Spec.prototype.getType = function() {
		return this.type;
	};

	Spec.prototype.setType = function(type) {
		this.type = type;
	};

	Spec.prototype.getPorts = function() {
		return this.ports;
	};

	Spec.prototype.setPorts = function(ports) {
		this.ports = ports;
	};

	Spec.prototype.addPort = function(port) {
		this.ports.push(port);
	};
}

method.build = function() {
	let entity = {
		'apiVersion': 'v1',
		'kind': 'Service',
		'spec': {
			'selector': EntityBuilder.getMetadata.call(this).getLabels(),
			'type': this.getSpec().getType(),
			'ports': this.getSpec().getPorts()
		}
	};
	entity.metadata = EntityBuilder.build.call(this);
	return entity;
};

module.exports = Service;