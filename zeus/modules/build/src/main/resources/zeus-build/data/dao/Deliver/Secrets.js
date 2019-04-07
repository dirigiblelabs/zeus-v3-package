var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var dao = daoApi.create({
	table: "ZEUS_SECRETS",
	properties: [
		{
			name: "Id",
			column: "ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "ServiceAccount",
			column: "SERVICEACCOUNT",
			type: "INTEGER",
		}, {
			name: "SecretType",
			column: "SECRETTYPE",
			type: "INTEGER",
		}, {
			name: "Username",
			column: "USERNAME",
			type: "VARCHAR",
		}, {
			name: "Password",
			column: "PASSWORD",
			type: "VARCHAR",
		}, {
			name: "Host",
			column: "HOST",
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
		table: "ZEUS_SECRETS",
		key: {
			name: "Id",
			column: "ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "ZEUS_SECRETS",
		key: {
			name: "Id",
			column: "ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	var entity = this.get(id);	
	dao.remove(id);
	triggerEvent("Delete", {
		table: "ZEUS_SECRETS",
		key: {
			name: "Id",
			column: "ID",
			value: id
		},
		entity: entity
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_SECRETS");
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
	producer.queue("zeus-build/Deliver/Secrets/" + operation).send(JSON.stringify(data));
}