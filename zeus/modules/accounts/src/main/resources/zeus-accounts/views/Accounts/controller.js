angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'zeus.zeus-accounts.Accounts.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onPartnersModified: function(callback) {
			on('zeus.zeus-accounts.Partners.modified', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/zeus-accounts/api/Accounts.js';
	var partnerOptionsApi = '/services/v3/js/zeus-accounts/api/Partners.js';

	$scope.partnerOptions = [];

	function partnerOptionsLoad() {
		$http.get(partnerOptionsApi)
		.success(function(data) {
			$scope.partnerOptions = data;
		});
	}
	partnerOptionsLoad();

	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.partnerOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.partnerOptions.length; i ++) {
			if ($scope.partnerOptions[i].Id === optionKey) {
				return $scope.partnerOptions[i].Email;
			}
		}
		return null;
	};

	$messageHub.onPartnersModified(partnerOptionsLoad);

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});