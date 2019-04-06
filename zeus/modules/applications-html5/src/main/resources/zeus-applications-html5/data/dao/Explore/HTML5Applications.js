var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var dao = daoApi.create({
	table: "ZEUS_APPLICATIONS_HTML5",
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
			name: "GitUrl",
			column: "GITURL",
			type: "VARCHAR",
		}, {
			name: "GitRevision",
			column: "GITREVISION",
			type: "VARCHAR",
		}, {
			name: "System",
			column: "SYSTEM",
			type: "VARCHAR",
		}, {
			name: "AuthorizationHeader",
			column: "AUTHORIZATIONHEADER",
			type: "VARCHAR",
		}, {
			name: "LocalPath",
			column: "LOCALPATH",
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
		table: "ZEUS_APPLICATIONS_HTML5",
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
		table: "ZEUS_APPLICATIONS_HTML5",
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
		table: "ZEUS_APPLICATIONS_HTML5",
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_APPLICATIONS_HTML5");
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
	producer.queue("zeus-applications-html5/Explore/HTML5Applications/" + operation).send(JSON.stringify(data));
}