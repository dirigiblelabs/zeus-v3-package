var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_ACCOUNTS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZA_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'ZA_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Region',
			'column': 'ZA_REGION',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Partner',
			'column': 'ZA_PARTNER',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_ACCOUNTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};