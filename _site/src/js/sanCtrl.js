/**
 * Created by fuyi on 2016/7/24.
 */
/*使用angular带来了代码的极大简化与清晰*/
var myAngular = angular.module("MyBlog",[]);
myAngular.controller("sanCtrl", ['$scope', '$http', function ($scope, $http){
    $scope.toggle_img = true;
    $scope.getInfo = function (){
        $http.get("/src/json/san.json").success(function (response){
            var index = window.location.href.substr(-1, 1);
            $scope.info = response;
            $scope.item = $scope.info[index];
            $scope.toggle_img = false;
            $scope.toggle_info = true;
        });
    };

    $scope.show_hide = function (){
        $scope.toggle_img = true;
        $scope.toggle_info = false;
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


