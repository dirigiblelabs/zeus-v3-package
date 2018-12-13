/*eslint-disable no-extend-native */

var method = Api.prototype;

var httpClient = require('http/v3/client');

function Api(metadata, server, token, namespace) {
	checkNotNull(metadata, 'The \'metadata\' is required!');
	checkNotNull(server, 'The \'server\' is required!');
	checkNotNull(token, 'The \'token\' is required!');
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

	let response = httpClient.get(api, options);

	checkResponseStatus(response, 200);

	let data = response.text ? JSON.parse(response.text) : null;
	return data && data.items ? data.items : [];
};

method.list = function(queryParameters) {
	let api = this.getApi(this.namespace);
	api += this.getQueryParameters(queryParameters);
	let options = getOptions(this.token);

	let response = httpClient.get(api, options);

	checkResponseStatus(response, 200);

	let data = response.text ? JSON.parse(response.text) : null;
	return data && data.items ? data.items : [];
};

method.get = function(id) {
	let api = this.getApi(this.namespace);
	api += '/' + id;
	let options = getOptions(this.token);

	let response = httpClient.get(api, options);

	return JSON.parse(response.text);
};

method.create = function(entity) {
	let api = this.getApi(this.namespace);
	let options = getOptions(this.token, entity);

	let response = httpClient.post(api, options);

	checkResponseStatus(response, 201);

	return JSON.parse(response.text);
};

method.update = function(id, entity) {
	let api = this.getApi(this.namespace);
	api += '/' + id;
	let options = getOptions(this.token, entity);

	let response = httpClient.put(api, options);

	checkResponseStatus(response, 200);

	return JSON.parse(response.text);
};

method.delete = function(id) {
	let api = this.getApi(this.namespace);
	api += '/' + id;
	let options = getOptions(this.token);

	let response = httpClient.delete(api, options);

	return JSON.parse(response.text);
};

method.getEntityBuilder = function() {
	var EntityBuilder = require(this.metadata.entityBuilder);
	return new EntityBuilder();
};

method.getApi = function(namespace) {
	let apiTemplate = '{{server}}/{{apiVersion}}/';
	if (isNotNull(namespace)) {
		apiTemplate += 'namespaces/{namespace}/';
	}
	apiTemplate += '{kind}';
	let api = apiTemplate
		.replaceAll('{{server}}', this.server)
		.replaceAll('{{apiVersion}}', this.metadata.apiVersion)
		.replaceAll('{namespace}', namespace)
		.replaceAll('{kind}', this.metadata.kind);
	return api;
};

method.getQueryParameters = function(parameters) {
	let queryParameters = '';
	if (parameters !== undefined && parameters !== null) {
		for (var i in parameters) {
			if (queryParameters === '') {
				queryParameters += '?';
			} else {
				queryParameters += '&';
			}
			queryParameters += i + '=' + parameters[i];
		}
	}
	return queryParameters;
};

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function checkNotNull(property, errorMessage) {
	if (!isNotNull(property)) {
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
}

function checkResponseStatus(response, expectedStatus) {
	if (response.statusCode !== expectedStatus) {
		console.error('Unexpected response status: ' + response.statusCode + ' | ' + response.text);
		throw new Error(response.text);
	}
}

function isNotNull(property) {
	return property !== undefined && property !== null;
}

function getOptions(token, entity) {
	let options = {
		'headers': [{
			'name': 'Authorization',
			'value': 'Bearer ' + token
		}],
		'sslTrustAllEnabled': true
	};
	if (isNotNull(entity)) {
		options.headers.push({
			'name': 'Content-Type',
			'value': 'application/json'
		});
		options.text = JSON.stringify(entity);
	}
	return options;
}

module.exports = Api;