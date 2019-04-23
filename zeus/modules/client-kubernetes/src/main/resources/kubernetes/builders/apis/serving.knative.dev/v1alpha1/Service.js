var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
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

	this.runLatest = new RunLatest();

	Spec.prototype.getRunLates = function() {
		return this.runLatest;
	};
}

function RunLatest() {

	this.configuration = new Configuration();

	RunLatest.prototype.getConfiguration = function() {
		return this.configuration;
	};
}

function Configuration() {

	this.revisionTemplate = new RevisionTemplate();

	Configuration.prototype.getBuild = function() {
		return this.build;
	};

	Configuration.prototype.setBuild = function(build) {
		this.build = build;
	};

	Configuration.prototype.getRevisionTemplate = function() {
		return this.revisionTemplate;
	};
}

function RevisionTemplate() {

	RevisionTemplate.prototype.getMetadata = function() {
		return this.metadata;
	};

	RevisionTemplate.prototype.setMetadata = function(metadata) {
		this.metadata = metadata;
	};

	RevisionTemplate.prototype.getSpec = function() {
		return this.spec;
	};

	RevisionTemplate.prototype.setSpec = function(spec) {
		this.spec = spec;
	};
}

method.build = function() {
	return {
		apiVersion: "serving.knative.dev/v1alpha1",
		kind: "Service",
		metadata: EntityBuilder.build.call(this),
		spec: {
			runLatest: {
				configuration: {
					build: this.getSpec().getRunLates().getConfiguration().getBuild(),
					revisionTemplate: {
						metadata: this.getSpec().getRunLates().getConfiguration().getRevisionTemplate().getMetadata(),
						spec: this.getSpec().getRunLates().getConfiguration().getRevisionTemplate().getSpec()
					}
				}
			}
		}
	};
};

module.exports = Service;