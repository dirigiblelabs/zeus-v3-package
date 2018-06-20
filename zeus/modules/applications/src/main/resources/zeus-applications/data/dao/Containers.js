var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATION_CONTAINERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZAC_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'ZAC_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Image',
			'column': 'ZAC_IMAGE',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Protocol',
			'column': 'ZAC_PROTOCOL',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Port',
			'column': 'ZAC_PORT',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Application',
			'column': 'ZAC_APPLICATION',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM CONTAINERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};