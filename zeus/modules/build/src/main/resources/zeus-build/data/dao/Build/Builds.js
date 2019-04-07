var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var dao = daoApi.create({
	table: "ZEUS_BUILDS",
	properties: [
		{
			name: "Id",
			column: "ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Name",
			column: "NAME",
			type: "VARCHAR",
		}, {
			name: "Image",
			column: "IMAGE",
			type: "VARCHAR",
		}, {
			name: "GitUrl",
			column: "GITURL",
			type: "VARCHAR",
		}, {
			name: "GitRevision",
			column: "GITREVISION",
			type: "VARCHAR",
		}, {
			name: "ServiceAccount",
			column: "SERVICEACCOUNT",
			type: "INTEGER",
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
		table: "ZEUS_BUILDS",
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
		table: "ZEUS_BUILDS",
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
		table: "ZEUS_BUILDS",
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_BUILDS");
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
	producer.queue("zeus-build/Build/Builds/" + operation).send(JSON.stringify(data));
}