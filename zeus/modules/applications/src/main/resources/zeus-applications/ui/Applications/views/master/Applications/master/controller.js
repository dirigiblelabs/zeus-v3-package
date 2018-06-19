angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'zeus.zeus-applications.Applications.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('zeus.zeus-applications.Applications.refresh', callback);
		},
		messageEntityModified: function() {
			message('modified');
		},
		messageEntitySelected: function(id) {
			message('selected', id);
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/zeus-applications/api/Applications.js';
	var templateOptionsApi = '/services/v3/js/zeus-templates/api/Templates.js';
	var clusterOptionsApi = '/services/v3/js/zeus-accounts/api/Clusters.js';

	$scope.templateOptions = [];

	$scope.clusterOptions = [];

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	function templateOptionsLoad() {
		$http.get(templateOptionsApi)
		.success(function(data) {
			$scope.templateOptions = data;
		});
	}
	templateOptionsLoad();

	function clusterOptionsLoad() {
		$http.get(clusterOptionsApi)
		.success(function(data) {
			$scope.clusterOptions = data;
		});
	}
	clusterOptionsLoad();

	$scope.openInfoDialog = function(entity) {
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$messageHub.onEntityRefresh(load);
	$scope.templateOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.templateOptions.length; i ++) {
			if ($scope.templateOptions[i].Id === optionKey) {
				return $scope.templateOptions[i].Name;
			}
		}
		return null;
	};

	$scope.clusterOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.clusterOptions.length; i ++) {
			if ($scope.clusterOptions[i].Id === optionKey) {
				return $scope.clusterOptions[i].Name;
			}
		}
		return null;
	};


	$scope.selectEntity = function(entity) {
		$scope.selectedEntity = entity;
		$messageHub.messageEntitySelected({
			'id': entity.Id		})
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});