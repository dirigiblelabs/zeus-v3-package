var EntityBuilder = require('kubernetes/builders/EntityBuilder').prototype;
var method = StatefulSet.prototype = Object.create(EntityBuilder);

method.constructor = StatefulSet;

function StatefulSet() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
	this.storage = '1Gi';
	this.accessModes = ['ReadWriteOnce'];
}

method.getSpec = function() {
	return this.spec;	
};

method.getStorage = function() {
	return this.storage;
};

method.setStorage = function(storage) {
	this.storage = storage;
};

method.getVolumeClaimAccessModes = function() {
	return this.accessModes;
};

method.setVolumeClaimAccessModes = function(accessModes) {
	this.accessModes = accessModes;
};

function Spec() {

	this.template = new Template();

	Spec.prototype.getServiceName = function() {
		return this.serviceName;
	};

	Spec.prototype.setServiceName = function(serviceName) {
		this.serviceName = serviceName;
	};

	Spec.prototype.getReplicas = function() {
		return this.replicas;
	};

	Spec.prototype.setReplicas = function(replicas) {
		this.replicas = replicas;
	};

	Spec.prototype.getTemplate = function() {
		return this.template;
	};

	function Template() {

		this.spec = new Spec();

		Template.prototype.getSpec = function() {
			return this.spec;
		};

		function Spec() {

			this.containers = [];
			this.terminationGracePeriodSeconds = 10;
			this.serviceAccountName = 'service-account';

			Spec.prototype.getTerminationGracePeriodSeconds = function() {
				return this.terminationGracePeriodSeconds;
			};

			Spec.prototype.setTerminationGracePeriodSeconds = function(terminationGracePeriodSeconds) {
				this.terminationGracePeriodSeconds = terminationGracePeriodSeconds;
			};

			Spec.prototype.getContainers = function() {
				return this.containers;
			};

			Spec.prototype.setContainers = function(containers) {
				this.containers = containers;
			};

			Spec.prototype.getServiceAccountName = function() {
				return this.serviceAccountName;
			};

			Spec.prototype.setServiceAccountName = function(serviceAccountName) {
				this.serviceAccountName = serviceAccountName;
			};

			Spec.prototype.addContainer = function(container) {
				this.containers.push(container);
			};
		}
	}
}

method.build = function() {
	let entity = {
		'apiVersion': 'apps/v1',
		'kind': 'StatefulSet',
		'spec': {
			'serviceName': this.getSpec().getServiceName(),
			'replicas': this.getSpec().getReplicas(),
			'selector': {
				'matchLabels': EntityBuilder.getMetadata.call(this).getLabels()
			},
			'template': {
				'metadata': {
					'labels': EntityBuilder.getMetadata.call(this).getLabels()
				},
				'spec': {
					'terminationGracePeriodSeconds': this.getSpec().getTemplate().getSpec().getTerminationGracePeriodSeconds(),
					'containers': this.getSpec().getTemplate().getSpec().getContainers(),
					'serviceAccountName': this.getSpec().getTemplate().getSpec().getServiceAccountName()
				}
			},
			'volumeClaimTemplates': [{
				'metadata': {
					'name': 'root'
				},
				'spec': {
					'accessModes': this.getVolumeClaimAccessModes(),
					'resources': {
						'requests': {
							'storage': this.getStorage()
						}
					}
				}
			}]
		}
	};
	entity.metadata = EntityBuilder.build.call(this);
	return entity;
};

module.exports = StatefulSet;