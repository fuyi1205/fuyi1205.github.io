/**
 * Created by fuyi on 2016/7/24.
 */
var myAngular = angular.module("MyBlog",[]),
    dom_coll = {
        item: $('.grid-item'),
        grid: $('.grid'),
        san: $('.san-display'),
        bref: $('.bref-introduction')
    };

myAngular.controller("sanCtrl", ['$scope', '$http', function ($scope, $http){
    $(document).on("click", ".grid-item", function (){
        var id = $(this).find("img").attr("data-id");
        $http.get("/src/json/san.json").success(function (response){
            $scope.info = response;
            response.forEach(function (item){
                if (item.id == id){
                    $scope.item = item;
                }
            });
        });
        dom_coll.grid.fadeOut();
        dom_coll.san.fadeIn();
    }).on("click", ".glyphicon-home", function (){
        dom_coll.grid.fadeIn();
        dom_coll.san.fadeOut();
    })
}]);


