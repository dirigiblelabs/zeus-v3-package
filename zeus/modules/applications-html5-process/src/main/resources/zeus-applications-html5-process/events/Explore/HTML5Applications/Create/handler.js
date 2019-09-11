var uuid = require("utils/v4/uuid")
var dao = require("zeus-applications-html5/data/dao/Explore/HTML5Applications");
var BuildsDao = require("zeus-build/data/dao/Build/Builds");
var ServiceAccountsDao = require("zeus-build/data/dao/Deliver/ServiceAccounts");
var TemplatesDao = require("zeus-templates/data/dao/Build/Templates");
var Credentials = require("zeus-deployer/utils/Credentials");
var Applications = require("zeus-deployer/utils/Applications");

exports.onMessage = function(message) {
	var event = JSON.parse(message);
	var application = dao.get(event.key.value);

	// TODO Get the service account in more inteligent way!
	var serviceAccount = ServiceAccountsDao.list()[0];

	BuildsDao.create({
		Name: serviceAccount.Name + "-build-" + uuid.random().substring(0, 8),
		Image: "promartio/helium",
		GitUrl: "https://github.com/dirigiblelabs/zeus-v3-build-template-html5",
		GitRevision: "master",
		ServiceAccount: serviceAccount.Id
	});

	// TODO To be triggered, after the Image is successfuly build -> BPM Process
	var templateId = TemplatesDao.list().filter(e => e.Name === "HTML5")[0].Id;
	var clusterId = Credentials.getDefaultCredentials().id;
	Applications.create(templateId, clusterId, application.Name, application);
};

exports.onError = function(error) {
	console.error("Not Implemented: " + error);
};
