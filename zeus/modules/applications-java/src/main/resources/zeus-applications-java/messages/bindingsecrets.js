var base64 = require("utils/v4/base64");
var logging = require('log/v4/logging');
var logger = logging.getLogger('org.eclipse.dirigible.zeus.apps.java');	
var Credentials = require("zeus-deployer/utils/Credentials");
var SecretsApi = require("kubernetes/api/v1/Secrets");
var SecretsBuilder = require("kubernetes/builders/api/v1/Secret");

const zeusServiceBindingLbl = "zeus.servicebinding/service";
const zeusServiceBindingTypeLbl = "zeus.servicebinding";

exports.applyBindingSecret = function(kserviceName, bindingName, bindingProperties) {
	let builder = new SecretsBuilder();
    const secretName = kserviceName + "-" + bindingName;
	builder.getMetadata().setName(secretName);
    builder.getMetadata().setNamespace("zeus");
    let labels = {};
    labels[zeusServiceBindingLbl] = kserviceName;
    labels[zeusServiceBindingTypeLbl] = "true";
    
    builder.getMetadata().setLabels(labels);
	builder.setType("kubernetes.io/opaque");
    let secretData = {};
    for (var prop in bindingProperties){
        if (typeof prop !== 'function' && prop!=='notify' && prop!=='notifyAll' && prop!=='wait'){
            secretData[prop] = base64.encode(String(bindingProperties[prop]));
        }
    }
	builder.setData(secretData);

	let entity = builder.build();

	let credentials = Credentials.getDefaultCredentials();
	let api = new SecretsApi(credentials.server, credentials.token, credentials.namespace);
    logger.debug("creating service binding secret {} for service {}.", secretName, kserviceName);
    api.apply(entity);
}

exports.listBindingSecrets = function(kserviceName){
    let credentials = Credentials.getDefaultCredentials();
	let api = new SecretsApi(credentials.server, credentials.token, credentials.namespace);
    let selector = {labelSelector: zeusServiceBindingLbl};
    if (kserviceName!==null && kserviceName!==undefined){
        selector.labelSelector+="%3D" + kserviceName;
    }
    let items = api.listAll(selector);
    logger.debug("{} service binding secrets{} found", items.length, kserviceName?" for service "+kserviceName:"");
    return items;
};

exports.deleteServiceBindingSecrets = function(kserviceName){
    let secrets = exports.listBindingSecrets(kserviceName);
    let credentials = Credentials.getDefaultCredentials();
    let api = new SecretsApi(credentials.server, credentials.token, credentials.namespace);
    for(var i=0; i<secrets.length; i++){
        logger.debug("deleting service binding secret {} for service {}", secrets[i].metadata.name, kserviceName);
        let items = api.delete(secrets[i].metadata.name);
        logger.debug("{} service binding secret for service {} deleted", kserviceName);
    }
}