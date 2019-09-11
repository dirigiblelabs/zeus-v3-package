/*eslint-disable no-extend-native */

var method = Api.prototype;

var errors = require("kubernetes/errors");
var httpClient = require("http/v4/client");
var logging = require('log/v4/logging');
var logger = logging.getLogger('org.eclipse.dirigible.zeus.k8s.api');

function Api(metadata, server, token, namespace) {
	checkNotNull(metadata, "The 'metadata' is required!");
	checkNotNull(server, "The 'server' is required!");
	checkNotNull(token, "The 'token' is required!");
	this.metadata = metadata;
	this.server = server;
	this.token = token;
	this.namespace = namespace;
}

method.getMetadata = function() {
	return this.metadata;
};

method.getServer = function() {
	return this.server;
};

method.getToken = function() {
	return this.token;
};

method.getNamespace = function() {
	return this.namespace;	
};

method.setNamespace = function(namespace) {
	this.namespace = namespace;	
};

method.listAll = function(queryParameters) {
	let api = this.getApi();
	api += this.getQueryParameters(queryParameters);
	let options = getOptions(this.token);
	logger.debug("{} {}", "GET", api);
	let response = httpClient.get(api, options);

	checkResponseStatus(response, 200);

	let data = response.text ? JSON.parse(response.text) : null;
	return data && data.items ? data.items : [];
};

method.list = function(queryParameters) {
	let api = this.getApi(this.namespace);
	api += this.getQueryParameters(queryParameters);
	let options = getOptions(this.token);
	logger.debug("{} {}", "GET", api);
	let response = httpClient.get(api, options);

	checkResponseStatus(response, 200);

	let data = response.text ? JSON.parse(response.text) : null;
	return data && data.items ? data.items : [];
};

method.get = function(id) {
	let api = this.getApi(this.namespace);
	api += "/" + id;
	let options = getOptions(this.token);
	logger.debug("{} {}", "GET", api);
	let response = httpClient.get(api, options);
	checkResponseStatus(response, 200);
	
	return JSON.parse(response.text);
};

method.create = function(entity) {
	let api = this.getApi(this.namespace);
	let options = getOptions(this.token, entity);
	logger.debug("{} {}", "POST", api);
	let response = httpClient.post(api, options);

	checkResponseStatus(response, 201);

	return JSON.parse(response.text);
};

method.update = function(id, entity) {
	let api = this.getApi(this.namespace);
	api += "/" + id;
	let options = getOptions(this.token, entity);
	logger.debug("{} {}", "PUT", api);
	let response = httpClient.put(api, options);

	checkResponseStatus(response, 200);

	return JSON.parse(response.text);
};

method.patch = method.merge = function(id, entity) {
	let api = this.getApi(this.namespace);
	api += "/" + id;
	let options = getOptions(this.token, entity);
	options.headers.push({
		name: "Content-Type",
		value: "application/merge-patch+json"
	});
	logger.debug("{} {}", "PATCH", api);
	let response = httpClient.patch(api, options);

	checkResponseStatus(response, 200);

	return JSON.parse(response.text);
};

method.apply = function(entity){
    try{
        this.create(entity);
    } catch (err){
        if(!(err instanceof errors.AlreadyExistsError)){
            throw err;
        }
        this.patch(entity.metadata.name, entity);
    }
}

method.delete = function(id) {
	let api = this.getApi(this.namespace);
	api += "/" + id;
	let options = getOptions(this.token);
	logger.debug("{} {}", "DELETE", api);
	let response = httpClient.delete(api, options);

	return JSON.parse(response.text);
};

method.getEntityBuilder = function() {
	var EntityBuilder = require(this.metadata.entityBuilder);
	return new EntityBuilder();
};

method.getApi = function(namespace) {
	let apiTemplate = "{{server}}/{{apiVersion}}/";
	if (isNotNull(namespace)) {
		apiTemplate += "namespaces/{namespace}/";
	}
	apiTemplate += "{kind}";
	let api = apiTemplate
		.replaceAll("{{server}}", this.server)
		.replaceAll("{{apiVersion}}", this.metadata.apiVersion)
		.replaceAll("{namespace}", namespace)
		.replaceAll("{kind}", this.metadata.kind);
	return api;
};

method.getQueryParameters = function(parameters) {
	let queryParameters = "";
	if (parameters !== undefined && parameters !== null) {
		for (var i in parameters) {
			if (typeof parameters[i] !== 'string' && typeof parameters[i] !== 'number'){
				continue;
			}
			if (queryParameters === "") {
				queryParameters += "?";
			} else {
				queryParameters += "&";
			}
			queryParameters += i + "=" + parameters[i];
		}
	}
	return queryParameters;
};

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};

function checkNotNull(property, errorMessage) {
	if (!isNotNull(property)) {
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
}

function checkResponseStatus(response, expectedStatus) {
	if (response.statusCode !== expectedStatus) {
		throw ErrorFromResponse(response)
	}
}

let ErrorFromResponse = function(response){
	if (response.statusCode == 400 || response.statusCode == 404 || response.statusCode == 409 || response.statusCode == 422){
		let ct = response.headers.filter(function(header){
			if (header.name !== 'Content-Type' && header.value !== 'application/json'){
				return false;
			}
			return true;
		}).map(function(header){
			return header.value;
		})[0];
		if(ct === 'application/json'){
			let parseErr, errResponse;
			try{
				errResponse = JSON.parse(response.text);
			} catch(parseErr){
				console.warn('failed to parse json response: '+ parseErr);
			}
			if (parseErr === undefined){
				let err = errors.fromResponse(errResponse);
				if(err)
					return err;
			}
		}
	}
	return new Error(response.text);
}

function isNotNull(property) {
	return property !== undefined && property !== null;
}

function getOptions(token, entity) {
	let options = {
		headers: [{
			name: "Authorization",
			value: "Bearer " + token
		}],
		sslTrustAllEnabled: true
	};
	if (isNotNull(entity)) {
		options.headers.push({
			name: "Content-Type",
			value: "application/json"
		});
		options.text = JSON.stringify(entity);
	}
	return options;
}

module.exports = Api;