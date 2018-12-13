var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATIONS',
	'properties': [
		{
			'name': 'Id',
			'column': 'APPLICATION_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'Name',
			'column': 'APPLICATION_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Template',
			'column': 'APPLICATION_TEMPLATE',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Cluster',
			'column': 'APPLICATION_CLUSTER',
			'type': 'INTEGER',
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

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_APPLICATIONS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};