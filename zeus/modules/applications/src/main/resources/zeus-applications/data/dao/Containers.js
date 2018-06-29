var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATION_CONTAINERS',
	'properties': [
		{
			'name': 'Id',
			'column': 'APPLICATION_CONTAINER_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'Name',
			'column': 'APPLICATION_CONTAINER_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Image',
			'column': 'APPLICATION_CONTAINER_IMAGE',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Protocol',
			'column': 'APPLICATION_CONTAINER_PROTOCOL',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Port',
			'column': 'APPLICATION_CONTAINER_PORT',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Application',
			'column': 'APPLICATION_CONTAINER_APPLICATION',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM CONTAINERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};