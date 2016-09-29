/**
 * Created by fuyi on 2016/7/24.
 */
/*使用angular带来了代码的极大简化与清晰*/
var myAngular = angular.module("MyBlog",['ngAnimate']);

myAngular.config([
    '$interpolateProvider', function($interpolateProvider) {
        return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
]);

myAngular.controller("sanCtrl", ['$scope', '$http', function ($scope, $http){
    $scope.getInfo = function (){
        $http.get("/dist/json/s11.json").success(function (response){
            var index = window.location.href.substr(-1, 1);
            $scope.info = response;
            $scope.item = $scope.info[index];
            $scope.toggle_img = !$scope.toggle_img;
            $scope.toggle_info = !$scope.toggle_info;
        });
    };

    $scope.show_hide = function (){
        $scope.toggle_img = !$scope.toggle_img;
        $scope.toggle_info = !$scope.toggle_info;
    };

    
    $scope.next = function (){
        var index = +$scope.item.id + 1;
        index = index > 7 ? index - 8 : index;
        $scope.item = $scope.info[index];
    };

    $scope.prev = function (){
        var index = +$scope.item.id - 1;
        index = index < 0 ? index + 8 : index;
        $scope.item = $scope.info[index];
    };
}]);

myAngular.controller("loginCtrl", ["$scope", function ($scope){
    $scope.registedInfo = "已有帐号，直接登陆";
    $scope.login = function (){
        alert("该模块尚未开放，敬请期待！");
    };

    $scope.registed = function (){
        $scope.ifRegisted = !$scope.ifRegisted;
        if($scope.registedInfo == "已有帐号，直接登陆"){
            $scope.registedInfo = "突然又想注册一个帐号";
        }else{
            $scope.registedInfo = "已有帐号，直接登陆";
        }
    }
}]);

myAngular.directive("s11", function (){
   return {
       restrict: 'E',
       templateUrl: '../dist/tpls/s11.html'
   }
});






