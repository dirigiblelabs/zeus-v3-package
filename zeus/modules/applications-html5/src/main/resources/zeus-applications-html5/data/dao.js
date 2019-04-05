exports.create = function(){
	return require('db/v3/dao').create({
		"table": "ZEUS_APPLICATIONS_HTML5",
		"properties": [
			{
				name: "id",
				column: "APP00H_ID",
				id: true,
				required: true,
				type: "BIGINT"
			},{
				name: "name",
				column: "APP00H_NAME",
				type: "VARCHAR",
				size: 126
			},{
				name: "user",
				column: "APP00H_USER",
				type: "VARCHAR",
				size: 256
			},{
				name: "createTime",
				column: "APP00H_CREATE_TIME",
				type: "BIGINT",
				dbValue: function(createTime){
					return createTime !== undefined ? new Date(createTime).getTime() : null;
				},
				value: function(dbValue){
					return dbValue !== null ? new Date(dbValue).toISOString() : undefined;
				}
			},{
				name: "lastModifiedTime",
				column: "APP00H_LASTMODIFIED_TIME",
				type: "BIGINT",
				dbValue: function(lastModifiedTime){
					return lastModifiedTime !== undefined ? new Date(lastModifiedTime).getTime() : null;
				},
				value: function(dbValue){
					return dbValue === null || dbValue === undefined? undefined : new Date(dbValue).toISOString();
				}
			},{
				name: "gitrepo",
				column: "APP00H_GITREPO",
				type: "VARCHAR",
				size: 1024
			},{
				name: "gitbranch",
				column: "APP00H_GITBRANCH",
				type: "VARCHAR",
				size: 126
			}]
		}, 'HTML5DAO');
}