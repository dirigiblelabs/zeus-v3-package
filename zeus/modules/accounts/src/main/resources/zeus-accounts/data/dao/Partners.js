var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_PARTNERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZP_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'FirstName',
			'column': 'ZP_FIRSTNAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'LastName',
			'column': 'ZP_LASTNAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Email',
			'column': 'ZP_EMAIL',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Address',
			'column': 'ZP_ADDRESS',
			'type':'VARCHAR',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_PARTNERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};