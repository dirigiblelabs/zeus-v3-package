exports.beforeCreate = function(entity, context) {
	var httpdConf = entity.data["httpd.conf"];
    entity.data["httpd.conf"] = replaceConfig(httpdConf, context);
    return entity;
};

function replaceConfig(httpdConf, context) {
    httpdConf = httpdConf.replace("{{system}}", context.System);
    httpdConf = httpdConf.replace("{{localPath}}", context.LocalPath);
    httpdConf = httpdConf.replace("{{authorizationHeader}}", context.AuthorizationHeader);
    return httpdConf;
}