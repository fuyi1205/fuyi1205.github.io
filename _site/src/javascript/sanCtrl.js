/**
 * Created by fuyi on 2016/7/24.
 */
var myAngular = angular.module("MyBlog",[]);
myAngular.controller("sanCtrl", ['$scope', '$http', function ($scope, $http){
    $("#san-container").on("click", ".grid-item", function (){
        var id = $(this).find("img").attr("data-id");
        $http.get("../san/san.json").success(function (response){
            for(var i in response){
                if(response[i].id == id){
                    $scope.infoIntro = response[i];
                    break;
                }
            }
        });
        $(".grid").fadeOut();
        $(".san-display").fadeIn();
    }).on("click", ".glyphicon-home", function (){
        $(".grid").fadeIn();
        $(".san-display").fadeOut();
    }).on("click", ".glyphicon-arrow-left", function () {
        var nameZi = $(".bref-introduction").find("span").text();
        $http.get("/san/san.json").success(function (response) {
            for (var i in response) {
                if (response[i].nameZi == nameZi) {
                    i = (i - 1) < 0 ? parseInt(i) + 7 : i - 1;
                    console.log(i);
                    $scope.infoIntro = response[i];
                    break;
                }
            }
        });
    }).on("click", ".glyphicon-arrow-right", function () {
        var nameZi = $(".bref-introduction").find("span").text();
        $http.get("/san/san.json").success(function (response) {
            for (var i in response) {
                if (response[i].nameZi == nameZi) {
                    i = (parseInt(i) + 1) > 7 ? i - 7 : parseInt(i) + 1;
                    $scope.infoIntro = response[i];
                    break;
                }
            }
        });
    });
}]);


