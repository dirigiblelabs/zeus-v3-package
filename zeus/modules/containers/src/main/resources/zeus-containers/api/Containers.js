var rs = require('http/v3/rs');
var dao = require('zeus-containers/data/dao/Containers');
var http = require('zeus-containers/api/http');

rs.service()
	.resource('')
		.get(function() {
			var entities = dao.list();
			http.sendResponseOk(entities);
		})
	.resource('{id}')
		.get(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
			    http.sendResponseOk(entity);
			} else {
				http.sendResponseNotFound('Containers not found');
			}
		})
	.resource('')
		.post(function(ctx, request, response) {
			var entity = request.getJSON();
			entity.id = dao.create(entity);
			response.setHeader('Content-Location', '/services/v3/js/zeus-containers/api/Containers.js/' + entity.id);
			http.sendResponseCreated(entity);
		})
	.resource('{id}')
		.put(function(ctx, request) {
			var entity = request.getJSON();
			entity.id = ctx.pathParameters.id;
			dao.update(entity);
			http.sendResponseOk(entity);
		})
	.resource('{id}')
		.delete(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
				dao.delete(id);
				http.sendResponseNoContent();
			} else {
				http.sendResponseNotFound('Containers not found');
			}
		})
.execute();