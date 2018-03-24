var myApp = angular.module('meigenizm',['ngRoute','ngSanitize','ngResource','ui.bootstrap','ngTouch']);

//////////////////////////////////////////
//Setting Factory
//////////////////////////////////////////
myApp.factory('coffee', ['$resource', function($resource){
	var coffee = $resource(
	  '/api/movies/:id', 
	  {id:'@id'}, {
		get: {method: 'GET',isArray:true},
		query: {method: 'GET', isArray: true},
		select:{method: 'GET',isArray:true},
		save: {method: 'POST'},
		remove: {method: 'DELETE'}
	});
	return coffee;
}]);

myApp.config(['$routeProvider', function($routeProvider,data) {
	$routeProvider
    .when('/index/', { title:'ホーム',controller:'IndexController', templateUrl: 'view/main.html' }) // 最初のページ
    .when('/detail/:id', { controller:'DetailController', templateUrl: 'detail.html',reloadOnsearch:false }) // 同様にテンプレ指定（ここでは遷移後）
    .when('/about/', { title:'Eeffocについて',controller:'AboutController', templateUrl: 'view/about.html' }) // サイト説明ページ
    .when('/list/', { title:'コーヒー豆一覧',controller:'ListController', templateUrl: 'view/list.html' }) // 同様にテンプレ指定（ここでは遷移後）
	.when('/test/', { controller:'IndexController', templateUrl: 'test.html' }) // 同様にテンプレ指定（ここでは遷移後）
	.when('/recommends/', { controller:'RecommendController', templateUrl: 'recommends.html' }) // 同様にテンプレ指定（ここでは遷移後）
    .when('/recommends/facts/', { controller:'RecommendController', templateUrl: 'recommends/fact.html' }) // 同様にテンプレ指定（ここでは遷移後）
    .when('/recommends/genius/', { controller:'RecommendController', templateUrl: 'recommends/genius.html' }) // 同様にテンプレ指定（ここでは遷移後）
    
	.otherwise({redirectTo: '/index/'}); // 初めに表示するテンプレ名
		return data;
  }]);

myApp.run(['$rootScope', function($rootScope) {
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | Site Name';
        }
    }

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.page.setTitle(current.$$route.title || 'Default Title');
    });
}]);


/////////////////////////////////////////////////
//IndexController
//index.htmlのコントローラ
/////////////////////////////////////////////////
myApp.controller('IndexController',['$scope', '$routeParams','$http', '$location','$swipe','$resource','coffee', function ($scope, $routeParams, $http, $location, $resource, $swipe, coffee ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.coffee = coffee.query();
	$scope.showSlide = true;
	//$scope.$watch(movies.url,'coffee.query()');
/////////////////////////////////////////////////
//各ページへ遷移
/////////////////////////////////////////////////
	//詳細ページ
	$scope.moveDetail = function(data){
		$location.path('/detail/'+data.Id);
		console.log(data);
	}
	//メイゲニズムについて
	$scope.moveAbout = function(){
		$location.path('/about/');
	}
}]);

/////////////////////////////////////////////////
//DetailController
//detail.htmlのコントローラ
/////////////////////////////////////////////////
myApp.controller('DetailController',['$scope', '$routeParams','$http','$resource','$anchorScroll','$location','$sce', 'movies', 'shareData', function ($scope, $routeParams, $http, $resource, $anchorScroll, $location, $sce , movies, shareData ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.id = parseInt($routeParams.id) - 1;
	console.log($scope.id);
	$scope.movies = movies.query();
	$scope.data = shareData.data;
	$scope.devoteFlg = false; //投票済判定フラグ
	$scope.showInfo = "info";//初期表示：作品情報
	//var trustedUrl = $scope.movies[$scope.id].Notice;
	//if(trustedUrl!=null){
	//$scope.url = $sce.trustAsResourceUrl(trustedUrl);
	//}

///////////////////////////
//投票する
//data:映画情報
//param:投票種別
///////////////////////////
	$scope.devote = function(data,param){
		console.log("devote is called");
		if(!$scope.devoteFlg){
			switch(param){
				case 1://スッキリ　MotivateParam
					data.MotivateParam = data.MotivateParam + 1;
				break;
				case 2://笑える　LaughParam
					data.LaughParam = data.LaughParam + 1;
				break;
				case 3://恋する LoveParam
					data.LoveParam = data.LoveParam + 1;
				break;
				case 4://泣ける SadParam
					data.SadParam = data.SadParam + 1;
				break;
				case 5://ほのぼの HealParam
					data.HealParam = data.HealParam + 1;
				break;
			}
			data.Rate = data.Rate + 1;	
		}	
		$http.put('/api/movies/rate/'+data._id, data).success(function(data) {
      console.log(data);
    });
		$scope.devoteFlg = true;
		$scope.data.Rate = data.Rate; 
	}
///////////////////////
//詳細ページ
//data:映画情報
//////////////////////
	$scope.moveDetail = function(data){
		//shareData.data =data;
		$scope.data = data;
		//console.log(data);
		$location.hash('top');
		$anchorScroll();
		$scope.devoteFlg = false;
		$scope.url = $sce.trustAsResourceUrl($scope.data.Notice);
		//ハッシュクリア
	}
///////////////////////
//タブ表示情報
//param:タブ内容
//////////////////////
	$scope.changeInfo = function(param){
		//console.log("$scope.showInfo="+param);
		$scope.showInfo = param;
	}
  //End of Controller	
	
}]);

myApp.controller('AboutController',['$scope', '$http','$resource','$location','coffee', function ($scope, $http, $resource, $location, coffee ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.coffee = coffee.query();
  //End of Controller
}]);
/////////////////////////////////////////////////
//ListController
//list.htmlのコントローラ
/////////////////////////////////////////////////
myApp.controller('ListController',['$scope', '$http', '$location','$resource','coffee', function ($scope, $http, $location, $resource, coffee ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.coffee = coffee.query();
	$scope.listFlg = false;
	$scope.packageFlg = true;
/////////////////////////////////////////////////
//各ページへ遷移
/////////////////////////////////////////////////
	//詳細ページ
	$scope.moveDetail = function(data){
		shareData.data =data;
		$location.path('/detail/');
		$location.hash('top');
		$anchorScroll();
		console.log(data);
	}
	//メイゲニズムについて
	$scope.moveAbout = function(){
		$location.path('/about/');
	}
///////////////////////
//詳細ページ
//data:映画情報
//////////////////////
	//詳細ページ
	$scope.moveDetail = function(data){
		shareData.data =data;
		$location.path('/detail/');
		console.log(data);
	}
///////////////////////
//タブ表示情報
//param:タブ内容
//////////////////////
	$scope.changeInfo = function(param){
		console.log("$scope.showInfo="+param);
			switch(param){
				case 1://画像順
					$scope.listFlg = true;
					$scope.packageFlg = false;
				break;
				case 2://パッケージ順
					$scope.listFlg = false;
					$scope.packageFlg = true;
				break;
			}
	}	
  //End of Controller	
}]);

/////////////////////////////////////////////////
//RecommendController
//recommends.htmlのコントローラ
/////////////////////////////////////////////////
myApp.controller('RecommendController',['$scope', '$http', '$location','$resource','movies', 'shareData', function ($scope, $http, $location, $resource, movies, shareData ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.movies = movies.query();

/////////////////////////////////////////////////
//各ページへ遷移
/////////////////////////////////////////////////
	//詳細ページ
	$scope.moveDetail = function(data){
		shareData.data =data;
		$location.path('/detail/');
		console.log(data);
	}
	//メイゲニズムについて
	$scope.moveAbout = function(){
		$location.path('/about/');
	}

	
  //End of Controller	
}]);
