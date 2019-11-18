var base64 = require("utils/v4/base64");
var logging = require('log/v4/logging');
var logger = logging.getLogger('org.eclipse.dirigible.zeus.apps.java');	
var Credentials = require("zeus-deployer/utils/Credentials");
var SecretsApi = require("kubernetes/api/v1/Secrets");
var SecretsBuilder = require("kubernetes/builders/api/v1/Secret");
var selectorsApi = require("kubernetes/labelselectors");

var zeusServiceBindingLbl = "zeus.servicebinding/service";
var zeusServiceBindingTypeLbl = "zeus.servicebinding";

function bindings(){
    let credentials = Credentials.getDefaultCredentials();
	var api = new SecretsApi(credentials.server, credentials.token, "zeus");
    var listAll = api.listAll;
    api.listAll = function(queryOptions){
        queryOptions = queryOptions || {};
        if(queryOptions.labelSelector){
            if(!queryOptions.labelSelector.hasLabel(zeusServiceBindingTypeLbl)){
                queryOptions.labelSelector
                .and()
                .label(zeusServiceBindingTypeLbl).equals().value("true");        
            }
        } else {
            queryOptions.labelSelector = new selectorsApi();
            queryOptions.labelSelector.label(zeusServiceBindingTypeLbl).equals().value("true");
        }
        return listAll.call(this, {
                labelSelector: queryOptions.labelSelector.build()
            });
    }.bind(api); 
    var list = api.list;
    api.list = function(queryOptions){
        queryOptions = queryOptions || {};
        if(queryOptions.labelSelector){
            if(!queryOptions.labelSelector.hasLabel(zeusServiceBindingTypeLbl)){
                queryOptions.labelSelector
                .and()
                .label(zeusServiceBindingTypeLbl).equals().value("true");        
            }
        } else {
            queryOptions.labelSelector = new selectorsApi();
            queryOptions.labelSelector.label(zeusServiceBindingTypeLbl).equals().value("true");
        }
        return list.call(this, {
                labelSelector: queryOptions.labelSelector.build()
            });
    }.bind(api);
    var apply = api.apply;
    api.apply = function(resource) {
        if(!resource.metadata.labels){
            resource.metadata.labels = {};
        }
        if(!resource.metadata.labels[zeusServiceBindingTypeLbl]){
             resource.metadata.labels[zeusServiceBindingTypeLbl] = true;
        }
        return apply.call(this, resource);
    }.bind(api);
    return api;
}

module.exports = bindings;

// exports.deleteServiceBindingSecrets = function(kserviceName){
//     let secrets = exports.listBindingSecrets(kserviceName);
//     let credentials = Credentials.getDefaultCredentials();
//     let api = new SecretsApi(credentials.server, credentials.token, credentials.namespace);
//     for(var i=0; i<secrets.length; i++){
//         logger.debug("deleting service binding secret {} for service {}", secrets[i].metadatata.name, kserviceName);
//         let items = api.delete(secrets[i].metadatata.name);
//         logger.debug("{} service binding secret for service {} deleted", kserviceName);
//     }
// }