var ApplicationsDao = require("zeus-applications/data/dao/Explore/Applications");
var TemplatesDao = require("zeus-templates/data/dao/Build/Templates");
var Applications = require("zeus-deployer/utils/Applications");

exports.onMessage = function(message) {
	var html5Application = JSON.parse(message).entity;
	var templateId = TemplatesDao.list().filter(e => e.Name === "HTML5")[0].Id;
	var application = ApplicationsDao.list().filter(e => e.Name === html5Application.Name && e.Template === templateId)[0];

	Applications.delete(application.Id);
};

exports.onError = function(error) {
	console.error("Not Implemented: " + error);
};
