var EntityBuilder = require('kubernetes/builders/EntityBuilder').prototype;
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

	this.selector = new Selector();
	this.template = new Template();

	Spec.prototype.getReplicas = function() {
		return this.replicas;
	};

	Spec.prototype.setReplicas = function(replicas) {
		this.replicas = replicas;
	};

	Spec.prototype.getSelector = function() {
		return this.selector;
	};

	Spec.prototype.getTemplate = function() {
		return this.template;
	};

	function Selector() {

		Selector.prototype.getMatchLabels = function() {
			return this.matchLabels;
		};

		Selector.prototype.setMatchLabels = function(matchLabels) {
			this.matchLabels = matchLabels;
		};
	}

	function Template() {

		this.spec = new Spec();

		Template.prototype.getSpec = function() {
			return this.spec;
		};

		function Spec() {

			this.containers = [];

			Spec.prototype.getContainers = function() {
				return this.containers;
			};

			Spec.prototype.setContainers = function(containers) {
				this.containers = containers;
			};

			Spec.prototype.addContainer = function(container) {
				this.containers.push(container);
			};
		}
	}
}

method.build = function() {
	let entity = {
		'apiVersion': 'extensions/v1beta1',
		'kind': 'Deployment',
		'spec': {
			'replicas': this.getSpec().getReplicas(),
			'selector': {
				'matchLabels': this.getSpec().getSelector().getMatchLabels()
			},
			'template': {
				'metadata': {
					'labels': EntityBuilder.getMetadata.call(this).getLabels()
				},
				'spec': {
					'containers': this.getSpec().getTemplate().getSpec().getContainers()
				}
			}
		}
	};
	entity.metadata = EntityBuilder.build.call(this);
	return entity;
};

module.exports = Deployment;