var dao = require('zeus-applications-html5/data/dao/Explore/HTML5Applications');
var BuildsDao = require('zeus-build/data/dao/Build/Builds');

exports.onMessage = function(message) {
	var event = JSON.parse(message);
	var application = dao.get(event.key.value);
	BuildsDao.create({
		Image: "promartio/helium",
		GitUrl: application.GitUrl,
		GitRevision: application.GitRevision,
		ServiceAccount: 2
	});
	console.log("HTML5 Application Created: " + JSON.stringify(application ));
};

exports.onError = function(error) {
	console.error("Not Implemented: " + error);
};
