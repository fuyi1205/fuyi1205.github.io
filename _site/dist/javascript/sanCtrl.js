var myAngular=angular.module("MyBlog",[]);myAngular.controller("sanCtrl",["$scope","$http",function(n,i){$("#san-container").on("click",".grid-item",function(){var a=$(this).find("img").attr("data-id");i.get("../san/san.json").success(function(i){for(var o in i)if(i[o].id==a){n.infoIntro=i[o];break}}),$(".grid").fadeOut(),$(".san-display").fadeIn()}).on("click",".glyphicon-home",function(){$(".grid").fadeIn(),$(".san-display").fadeOut()}).on("click",".glyphicon-arrow-left",function(){var a=$(".bref-introduction").find("span").text();i.get("/san/san.json").success(function(i){for(var o in i)if(i[o].nameZi==a){o=o-1<0?parseInt(o)+7:o-1,console.log(o),n.infoIntro=i[o];break}})}).on("click",".glyphicon-arrow-right",function(){var a=$(".bref-introduction").find("span").text();i.get("/san/san.json").success(function(i){for(var o in i)if(i[o].nameZi==a){o=parseInt(o)+1>7?o-7:parseInt(o)+1,n.infoIntro=i[o];break}})})}]);