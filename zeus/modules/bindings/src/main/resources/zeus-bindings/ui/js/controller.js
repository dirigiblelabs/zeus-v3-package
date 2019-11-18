angular.module('page', ['ideUiCore', 'ngRs', 'ui.bootstrap'])
.config(["messageHubProvider", function(messageHubProvider) {
	messageHubProvider.evtNamePrefix = 'zeus.Explore.Bindings';
}])    
.factory('$messageHub', ['messageHub', function (messageHub) {
    return {
        onEntityRefresh: function (callback) {
            messageHub.on('refresh', callback);
        },
        messageEntityModified: function () {
            messageHub.send('modified');
        }
    };
}])
.config(["EntityProvider", function(entityProvider) {
  entityProvider.config.apiEndpoint = '../../../../../../../../services/v3/js/zeus-bindings/api/bindings.js';
}])
.controller('PageController', ['Entity', '$messageHub', '$http', function (Entity, $messageHub, $http) {

    this.dataPage = 1;
    this.dataCount = 0;
    this.dataOffset = 0;
    this.dataLimit = 10;

    this.b64decode = function(input){
        if(input == null){
            return "";
        }
        return btoa(input);
    };

	this.getPages = function () {
        return new Array(this.dataPages);
    };

    this.nextPage = function () {
        if (this.dataPage < this.dataPages) {
            this.loadPage(this.dataPage + 1);
        }
    };

    this.previousPage = function () {
        if (this.dataPage > 1) {
            this.loadPage(this.dataPage - 1);
        }
    };

    this.loadPage = function () {
        return Entity.query({
		            $limit: this.dataLimit,
		            $offset: (this.dataPage - 1) * this.dataLimit
		        }).$promise
		        .then(function (data) {
	                this.dataCount = data.$count;
	                this.dataPages = Math.ceil(this.dataCount / this.dataLimit);
	                this.data = data;
	            }.bind(this))
	            .catch(function (err) {
	               if (err.data){
		            	console.error(err.data);
		            }
		            console.error(err);
	            });
    };

    this.openNewDialog = function (entity) {
        this.actionType = entity?'update':'new';
        this.entity = entity || {
            properties:{}
        };
        this.property = {};
        this.services = $http.get('../../../../../../../../services/v3/js/zeus-services/api/services.js')
                .then(function(r) {
                    this.services = r.data;
                }.bind(this));
        toggleEntityModal();
    };

    this.openDeleteDialog = function (entity) { 
        this.actionType = 'delete';
        this.entity = entity;
        toggleEntityModal();
    };

    this.close = function () {
//        this.loadPage(this.dataPage);
		delete this.entity;
        toggleEntityModal();
    };
	
	var entityAction = function(action){
		let args = [this.entity];
        if(action === 'update'){
            args.unshift({name: this.entity.name});
        }
        if(action === 'update' || action === 'save'){
            this.entity.service = this.entity.service.name;
        }
		return Entity[action].apply(this, args).$promise
			 	.then(function () {
		            this.loadPage(this.dataPage);
		            $messageHub.messageEntityModified();
		            toggleEntityModal();
		        }.bind(this))
		        .catch(function (err) {
		        	if (err.data && err.data.details){
		            	console.error(err.data.details);
		            }
		            console.error(err);
		        });
	}.bind(this);

    this.create = function () {
		return entityAction('save');
    };

    this.update = function () {
    	return entityAction('update');
    };

    this.delete = function () {
    	return entityAction('delete');
    };

    this.parseDate = function(dateString){
    	return Date.parse(dateString);
    };

    this.addProperty =  function(){
        this.entity.properties[this.property.name] = this.property.value;
        this.property.name = "";
        this.property.value = "";
    };
    this.removeProperty =  function(name){
        delete this.entity.properties[name];
    }

    this.canSubmit = function(){
        return this.entity && this.entity.service && Object.keys(this.entity.properties).length > 0;
    }

    $messageHub.onEntityRefresh(this.loadPage);

    var toggleEntityModal = function() {
        $('#entityModal').modal('toggle');//FIXME: dom control from angular controller - not good. use directive or a module that does that.
        this.errors = '';
    }.bind(this);
    
    this.loadPage(this.dataPage);
}])