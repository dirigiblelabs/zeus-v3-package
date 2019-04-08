var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
var method = Deployment.prototype = Object.create(EntityBuilder);

method.constructor = Deployment;

function Deployment() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
}

method.getSpec = function() {
	return this.spec;	
};

function Spec() {

	this.template = new Template();

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
	}
}

method.build = function() {
	return {
		apiVersion: "apps/v1",
		kind: "Deployment",
		metadata: EntityBuilder.build.call(this),
		spec: {
			replicas: this.getSpec().getReplicas(),
			selector: {
				matchLabels: EntityBuilder.getMetadata.call(this).getLabels()
			},
			template: {
				metadata: {
					labels: EntityBuilder.getMetadata.call(this).getLabels()
				},
				spec: {
					containers: this.getSpec().getTemplate().getSpec().getContainers(),
					volumes: this.getSpec().getTemplate().getSpec().getVolumes()
				},
			}
		}
	};
};

module.exports = Deployment;