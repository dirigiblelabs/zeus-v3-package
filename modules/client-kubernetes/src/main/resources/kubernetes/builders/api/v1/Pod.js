var EntityBuilder = require('kubernetes/builders/EntityBuilder').prototype;
var method = Pod.prototype = Object.create(EntityBuilder);

method.constructor = Pod;

function Pod() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
}

method.getSpec = function() {
	return this.spec;	
};

function Spec() {

	this.containers = [];
	this.volumes = [];

	Spec.prototype.getContainers = function() {
		return this.containers;
	};

	Spec.prototype.setContainers = function(containers) {
		this.containers = containers;
	};

	Spec.prototype.addContainer = function(container) {
		this.containers.push(container);
	};

	Spec.prototype.getVolumes = function() {
		return this.volumes;
	};

	Spec.prototype.setVolumes = function(volumes) {
		this.volumes = volumes;
	};

	Spec.prototype.addVolume = function(volume) {
		this.volumes.push(volume);
	};
}

method.build = function() {
	let entity = {
		'apiVersion': 'v1',
		'kind': 'Pod',
		'spec': {
			'containers': this.getSpec().getContainers(),
			'volumes': this.getSpec().getVolumes()
		}
	};
	entity.metadata = EntityBuilder.build.call(this);
	return entity;
};

module.exports = Pod;