var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var dao = daoApi.create({
	table: "ZEUS_CLUSTERS",
	properties: [
		{
			name: "Id",
			column: "ZC_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Name",
			column: "ZC_NAME",
			type: "VARCHAR",
		}, {
			name: "API",
			column: "ZC_API",
			type: "VARCHAR",
		}, {
			name: "Ingress",
			column: "ZC_INGRESS",
			type: "VARCHAR",
		}, {
			name: "Token",
			column: "ZC_TOKEN",
			type: "VARCHAR",
		}, {
			name: "Account",
			column: "ZC_ACCOUNT",
			type: "INTEGER",
		}, {
			name: "IsDefault",
			column: "ZC_IS_DEFAULT",
			type: "BOOLEAN",
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
		table: "ZEUS_CLUSTERS",
		key: {
			name: "Id",
			column: "ZC_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "ZEUS_CLUSTERS",
		key: {
			name: "Id",
			column: "ZC_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "ZEUS_CLUSTERS",
		key: {
			name: "Id",
			column: "ZC_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_CLUSTERS");
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
	producer.queue("zeus-accounts/Deliver/Clusters/" + operation).send(JSON.stringify(data));
}