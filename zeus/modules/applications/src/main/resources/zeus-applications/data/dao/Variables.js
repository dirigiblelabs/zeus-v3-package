var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATION_VARIABLES',
	'properties': [
		{
			'name': 'Id',
			'column': 'APPLICATION_VARIABLE_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'Name',
			'column': 'APPLICATION_VARIABLE_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Value',
			'column': 'APPLICATION_VARIABLE_VALUE',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Application',
			'column': 'APPLICATION_VARIABLE_APPLICATION',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM VARIABLES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};