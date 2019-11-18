var EntityBuilder = require("kubernetes/builders/EntityBuilder").prototype;
var method = VirtaulService.prototype = Object.create(EntityBuilder);

method.constructor = VirtaulService;

function VirtaulService() {
	EntityBuilder.constructor.apply(this);
	this.spec = new Spec();
}

method.getSpec = function() {
	return this.spec;	
};

function Spec() {

	this.gateways = [];
	this.hosts = [];
	this.http = [];

	Spec.prototype.getGateways = function() {
		return this.gateways;
	};

	Spec.prototype.setGateways = function(gateways) {
		this.gateways = gateways;
	};

	Spec.prototype.addGateway = function(gateway) {
		this.gateways.push(gateway);
	};

	Spec.prototype.getHosts = function() {
		return this.hosts;
	};

	Spec.prototype.setHosts = function(hosts) {
		this.hosts = hosts;
	};

	Spec.prototype.addHost = function(host) {
		this.hosts.push(host);
	};

	Spec.prototype.getHttp = function() {
		return this.http;
	};

	Spec.prototype.setHttp = function(http) {
		this.http = http;
	};

	Spec.prototype.addHttp = function(http) {
		this.http.push(http);
	};

	Spec.prototype.getHttpBuilder = function() {
		return new HttpBuilder();
	};
}

function HttpBuilder() {

	this.match = [];
	this.route = [];

	HttpBuilder.prototype.getMatch = function() {
		return this.match;
	};

	HttpBuilder.prototype.setMatch = function(match) {
		this.match = match;
	};

	HttpBuilder.prototype.addMatch = function(match) {
		this.match.push(match);
	};

	HttpBuilder.prototype.getRoute = function() {
		return this.route;
	};

	HttpBuilder.prototype.setRoute = function(route) {
		this.route = route;
	};

	HttpBuilder.prototype.addRoute = function(route) {
		this.route.push(route);
	};

	HttpBuilder.prototype.build = function() {
		return {
			match: this.getMatch(),
			route: this.getRoute()
		};
	};
}

method.build = function() {
	return {
		apiVersion: "networking.istio.io/v1alpha3",
		kind: "VirtualService",
		metadata: EntityBuilder.build.call(this),
		spec: {
			gateways: this.getSpec().getGateways(),
			hosts: this.getSpec().getHosts(),
			http: this.getSpec().getHttp()
		}
	};
};

module.exports = VirtaulService;