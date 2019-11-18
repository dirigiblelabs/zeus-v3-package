var base64 = require("utils/v4/base64");
var logging = require('log/v4/logging');
var response = require('http/response');
var logger = logging.getLogger('org.eclipse.dirigible.zeus.bindings');
var rs = require('http/v4/rs');
var bindings = require('zeus-bindings/k8s');
var apierrors = require("kubernetes/errors");
var selectorsApi = require("kubernetes/labelselectors");
var SecretsApi = require("kubernetes/api/v1/Secrets");
var SecretsBuilder = require("kubernetes/builders/api/v1/Secret");

var zeusServiceBindingLbl = "zeus.servicebinding/service";
var zeusServiceBindingTypeLbl = "zeus.servicebinding";

function alphanumeric(length){
	if(!length)
		length = 4;
	var power = length;
	var sliceIndex = -Math.abs(length);
	return ("0000" + (Math.random()*Math.pow(36,power) << 0).toString(36)).slice(sliceIndex);
};

function fromResource(resource){
    let _e = {
        name: resource.metadata.name,
        service: resource.metadata.labels['zeus.servicebinding/service'],
        createTime: resource.metadata.creationTimestamp,
        properties: resource.data
    };
    Object.keys(_e.properties).map(function(key, index) {
        _e.properties[key] = String.fromCharCode.apply(String, base64.decode(_e.properties[key]));
    });
    return _e;
}

let BadRequestError = function(message, details) {
  this.name = "BadRequestError";
  this.message = message || "";
  this.details = details || "";
  this.reason = 'BadRequest';
  this.code = 400;
};
BadRequestError.prototype = Error.prototype;

function toResource(entity){
    if (!entity) {
        throw new BadRequestError("Illegal argment: `entity` cannot be " + entity);
    }
    if (!entity.service) {
        throw new BadRequestError("Illegal argment: `entity.service` cannot be " + entity.service);
    }
    if (!entity.properties || entity.properties.length===0) {
        throw new BadRequestError("Illegal argment: `entity.properties` must be a non-empty array.");
    }
    
    let secretName = entity.name || (entity.service + alphanumeric(8));
    let ns = "zeus";

    let builder = new SecretsBuilder();
    builder.getMetadata().setName(secretName);
    builder.getMetadata().setNamespace(ns);
    let labels = {};
    labels[zeusServiceBindingLbl] = entity.service;
    labels[zeusServiceBindingTypeLbl] = "true";
    builder.getMetadata().setLabels(labels);
    builder.setType("kubernetes.io/opaque");
    let secretData = {};
    for (var prop in entity.properties){
        if (typeof prop !== 'function'){
            secretData[prop] = base64.encode(String(entity.properties[prop]));
        }
    }
    //sanitize
    delete secretData.notify;
    delete secretData.notifyAll;
    delete secretData.wait;
    builder.setData(secretData);

    return builder.build();
}

function resolveError(err, ctx){
    ctx.errorMessage = err.message;
    if (err instanceof apierrors.FieldValueInvalidError || err instanceof apierrors.NotFoundError || err instanceof BadRequestError){
        ctx.httpErrorCode = err.code;
        ctx.errorName = err.reason;
    }
    return err;
}

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
            let serviceName = ctx.serviceName;
            let entities = [];
            let b = new bindings();            
            try{
                let opts;
                if (serviceName){
                    let selectors = new selectorsApi();
                    opts = {
                        labelSelector: selectors.label('zeus.servicebinding/service').equals().value(serviceName)
                    };
                }
			    entities = b.list(opts).map(fromResource);
                response.println(JSON.stringify(entities,null,2));
            } catch (err){
                throw resolveError(err, ctx);
            }
            response.setHeader('X-data-count', entities.length);
		})
        .before(function(ctx, request, response, methodHandler, controller){
			var queryOptions = {};
			var parameters = request.getParameterNames();
			for (var i = 0; i < parameters.length; i ++) {
				queryOptions[parameters[i]] = request.getParameter(parameters[i]);
			}
            let serviceName = queryOptions['serviceName'];
            // The serviceName parameter will be used as label value and this validation is required due to the labels value constraints.
            if(serviceName && serviceName.length>63){
                logger.warn("`serviceName` parameter is {} characters long. It must be 63 characters or less.", serviceName.length);
                controller.sendError(response.BAD_REQUEST, undefined, response.HttpCodesReasons.getReason(String(response.BAD_REQUEST)), Error('The `serviceName` parameter is too long ('+serviceName.length+'>63).'));
                return;
            }
            ctx.serviceName = serviceName;
        })
        .produces("application/json")
	.resource('count')
		.get(function(ctx, request) {
            let entities = [];
            let b = new bindings();
            try{
                var entities = b.list();
                response.println(JSON.stringify(entities,null,2));
            } catch (err){
                throw resolveError(err, ctx);
            }
            response.setHeader('X-data-count', entities.length);
		})
        .produces("application/json")
	.resource('{name}')
		.get(function(ctx, request, response) {
			var name = ctx.pathParameters.name;
            try{
                let b = new bindings();
                let entity = b.get(name);
                let payloadObj = fromResource(entity);
                let payload = JSON.stringify(payloadObj,null,2);
                response.println(payload);
            } catch (err){
                throw resolveError(err, ctx);
            }
		})
        .produces("application/json")
	.resource('')
		.post(function(ctx, request, response) {
            let b = new bindings();
            try{
                b.apply(ctx.binding);
                response.setHeader('Content-Location', '/services/v3/js/zeus-bindings/api/bindings.js/' + ctx.binding.metadata.name);
                response.status = 201;
            } catch (err){
                throw resolveError(err, ctx);
            }
		})
        .before(function(ctx, request, response, methodHandler, controller){
            var entity = request.getJSON();
            let b = new bindings();
            try{
                let binding = toResource(entity);
                ctx.binding = binding;
            } catch (err){
                throw resolveError(err, ctx);
            }
        })
        .consumes("application/json")
	.resource('{name}')
		.put(function(ctx, request, response) {
            var name = ctx.pathParameters.name;
			var entity = request.getJSON();
            let b = new bindings();
            try{
			    let bindings = toResource(entity);
                b.apply(bindings);
                response.status = 201;
            } catch (err){
                throw resolveError(err, ctx);
            }
		})
        .consumes("application/json")
	.resource('{name}')
		.delete(function(ctx, request, response) {
			var name = ctx.pathParameters.name;
            let b = new bindings();
            try{
                b.delete(name);
                response.setStatus(204);
            } catch (err){
                throw resolveError(err, ctx);
            }
		})
.execute();