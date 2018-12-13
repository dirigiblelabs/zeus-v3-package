var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_CLUSTERS',
	'properties': [
		{
			'name': 'Id',
			'column': 'ZC_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'ZC_NAME',
			'type': 'VARCHAR',
		}, {
			'name': 'URL',
			'column': 'ZC_URL',
			'type': 'VARCHAR',
		}, {
			'name': 'Token',
			'column': 'ZC_TOKEN',
			'type': 'VARCHAR',
		}, {
			'name': 'Account',
			'column': 'ZC_ACCOUNT',
			'type': 'INTEGER',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_CLUSTERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};