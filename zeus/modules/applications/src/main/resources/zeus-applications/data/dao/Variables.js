var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATION_VARIABLES',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZAV_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'ZAV_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Value',
			'column': 'ZAV_VALUE',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Application',
			'column': 'ZAV_APPLICATION',
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

exports.count = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM VARIABLES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};