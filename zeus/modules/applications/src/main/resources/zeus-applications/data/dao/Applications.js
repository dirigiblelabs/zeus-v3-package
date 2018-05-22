var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATIONS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZA_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Template',
			'column': 'ZA_TEMPLATE',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Cluster',
			'column': 'ZA_CLUSTER',
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