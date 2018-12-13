var EntityBuilder = require('kubernetes/builders/EntityBuilder').prototype;
var method = Ingress.prototype = Object.create(EntityBuilder);

method.constructor = Ingress;

function Ingress() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
}

method.getSpec = function() {
	return this.spec;	
};

function Spec() {

	Spec.prototype.getHost = function() {
		return this.host;
	};

	Spec.prototype.setHost = function(host) {
		this.host = host;
	};

	Spec.prototype.getPath = function() {
		return this.path;
	};

	Spec.prototype.setPath = function(path) {
		this.path = path;
	};

	Spec.prototype.getServiceName = function() {
		return this.serviceName;
	};

	Spec.prototype.setServiceName = function(serviceName) {
		this.serviceName = serviceName;
	};

	Spec.prototype.getServicePort = function() {
		return this.servicePort;
	};

	Spec.prototype.setServicePort = function(servicePort) {
		this.servicePort = servicePort;
	};
}

method.build = function() {
	let entity = {
		'apiVersion': 'extensions/v1beta1',
		'kind': 'Ingress',
		'spec': {
			'rules': [{
				'host': this.getSpec().getHost(),
				'http': {
					'paths': [{
						'path': this.getSpec().getPath(),
						'backend': {
							'serviceName': this.getSpec().getServiceName(),
							'servicePort': this.getSpec().getServicePort()
						}
					}]
				}
			}]
		}
	};
	entity.metadata = EntityBuilder.build.call(this);
	return entity;
};

module.exports = Ingress;