var myApp = angular.module('meigenizm',['ngResource']);
myApp.factory('coffee', ['$resource', function($resource){
	var coffee = $resource('/api/movies/:id/:Title/:Type/:data' , {id:'@id', Title:'@Title'}, {
		get: {method: 'GET', isArray: true},
		query: {method: 'GET', isArray: true},
		save: {method: 'POST'},
		remove: {method: 'DELETE'}
	});
	return coffee;
}]);

///////////////////////////////////
//EditController
///////////////////////////////////
myApp.controller('EditController',['$scope','$http','coffee', function ($scope, $http, coffee){ 
	//Get the all data of movies
	var coffeelist = {};
	$scope.coffee = coffee.query();
	$scope.detailFlg = false;
	$scope.detail = {};

///////////////////////////////////
//Data CRUD
///////////////////////////////////
  //Update Data
  $scope.updateData = function(data) {
    console.log(data._id);
    $http.put('/api/movies/'+data._id, data).success(function(data) {
      console.log(data);	
    });
  };
  
  //Edit Data
  $scope.editData = function(data){
    $scope.data = data;
  }
    
  //add Data  
  $scope.addData = function(){
    $http.put('/api/movies/').success(function(data){
      console.log(data);
    });
  }	
}]);

////////////////////////////////
//Modal Controller
////////////////////////////////
var ModalController = function ($scope, $modalInstance, detail) {
	$scope.detail = detail;
	//close the modal
	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	};
};
