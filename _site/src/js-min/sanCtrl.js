var myAngular=angular.module("MyBlog",[]);myAngular.config(["$interpolateProvider",function(n){return n.startSymbol("{(").endSymbol(")}")}]),myAngular.controller("sanCtrl",["$scope","$http",function(n,o){n.toggle_img=!0,n.getInfo=function(){o.get("/dist/json/san.json").success(function(o){var t=window.location.href.substr(-1,1);n.info=o,n.item=n.info[t],n.toggle_img=!1,n.toggle_info=!0})},n.show_hide=function(){n.toggle_img=!0,n.toggle_info=!1},n.next=function(){var o=+n.item.id+1;o=o>7?o-8:o,n.item=n.info[o]},n.prev=function(){var o=+n.item.id-1;o=o<0?o+8:o,n.item=n.info[o]}}]);