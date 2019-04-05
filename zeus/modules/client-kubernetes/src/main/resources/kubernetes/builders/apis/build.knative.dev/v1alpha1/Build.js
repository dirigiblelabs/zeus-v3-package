var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
var method = Build.prototype = Object.create(EntityBuilder);

method.constructor = Build;

function Build() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
}

method.getSpec = function() {
	return this.spec;	
};

function Spec() {

	this.source = new Source();
	this.template = new Template();

	Spec.prototype.getServiceAccountName = function() {
		return this.serviceAccountName;
	};

	Spec.prototype.setServiceAccountName = function(serviceAccountName) {
		this.serviceAccountName = serviceAccountName;
	};

	Spec.prototype.getSource = function() {
		return this.source;
	};

	Spec.prototype.getTemplate = function() {
		return this.template;
	};
}

function Source() {

	this.git = new Git();

	Source.prototype.getGit = function() {
		return this.git;
	};
}

function Git() {

	Git.prototype.getUrl = function() {
		return this.url;
	};

	Git.prototype.setUrl = function(url) {
		this.url = url;
	};

	Git.prototype.getRevision = function() {
		return this.revision;
	};

	Git.prototype.setRevision = function(revision) {
		this.revision = revision;
	};
}

function Template() {

	this.arguments = [];

	Template.prototype.getName = function() {
		return this.name;
	};

	Template.prototype.setName = function(name) {
		this.name = name;
	};

	Template.prototype.getArguments = function() {
		return this.arguments;
	};

	Template.prototype.seteArguments = function(arguments) {
		this.arguments = arguments;
	};
}

method.build = function() {
	return {
		apiVersion: "build.knative.dev/v1alpha1",
		kind: "Build",
		metadata: EntityBuilder.build.call(this),
		spec: {
			serviceAccountName: this.getSpec().getServiceAccountName(),
			source: {
				git: {
					url: this.getSpec().getSource().getGit().getUrl(),
					revision: this.getSpec().getSource().getGit().getRevision()
				}
			},
			template: {
				name: this.getSpec().getTemplate().getName(),
				arguments: this.getSpec().getTemplate().getArguments()
			}
		}
	};
};

module.exports = Build;