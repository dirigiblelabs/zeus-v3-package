var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var dao = daoApi.create({
	table: "ZEUS_PARTNERS",
	properties: [
		{
			name: "Id",
			column: "ZP_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "FirstName",
			column: "ZP_FIRSTNAME",
			type: "VARCHAR",
		}, {
			name: "LastName",
			column: "ZP_LASTNAME",
			type: "VARCHAR",
		}, {
			name: "Email",
			column: "ZP_EMAIL",
			type: "VARCHAR",
		}, {
			name: "Address",
			column: "ZP_ADDRESS",
			type: "VARCHAR",
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	var id = dao.insert(entity);
	triggerEvent("Create", {
		table: "ZEUS_PARTNERS",
		key: {
			name: "Id",
			column: "ZP_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "ZEUS_PARTNERS",
		key: {
			name: "Id",
			column: "ZP_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "ZEUS_PARTNERS",
		key: {
			name: "Id",
			column: "ZP_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_PARTNERS");
	if (resultSet !== null && resultSet[0] !== null) {
		if (resultSet[0].COUNT !== undefined && resultSet[0].COUNT !== null) {
			return resultSet[0].COUNT;
		} else if (resultSet[0].count !== undefined && resultSet[0].count !== null) {
			return resultSet[0].count;
		}
	}
	return 0;
};

function triggerEvent(operation, data) {
	producer.queue("zeus-accounts/Deliver/Partners/" + operation).send(JSON.stringify(data));
}