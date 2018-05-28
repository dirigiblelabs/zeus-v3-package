var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATION_ENDPOINTS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZAE_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'URL',
			'column': 'ZAE_URL',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Application',
			'column': 'ZAE_APPLICATION',
			'type':'INTEGER',
			'id': false,
			'required': true
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};