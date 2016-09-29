var canvasClock = {
    ctx: document.getElementById("drawing").getContext("2d"),

    init: function () {
        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = "#000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.lineWidth = 2;
    },

    clear: function (){
        this.ctx.translate(-100,-100);
        this.ctx.clearRect(0,0,200,200);
    },

    drawBackground: function () {
        var angle;
        this.ctx.beginPath();
        this.ctx.translate(100, 100);
        this.ctx.arc(0, 0, 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.moveTo(99, 0);
        this.ctx.arc(0, 0, 99, 0, 2 * Math.PI);
        this.ctx.moveTo(94, 0);
        this.ctx.arc(0, 0, 94, 0, 2 * Math.PI);
        for (var i = 1; i <= 12; i += 1) {
            angle = i * Math.PI / 6;
            this.ctx.moveTo(Math.sin(angle) * 94, -Math.cos(angle) * 94);
            this.ctx.lineTo(Math.sin(angle) * 89, -Math.cos(angle) * 89);
            this.ctx.fillText(String(i), Math.sin(angle) * 80, -Math.cos(angle) * 80);
        }
        this.ctx.closePath();
    },

    drawContext: function () {
        var time = new Date(),
            s = time.getSeconds() / 60 * 2 * Math.PI,
            m = time.getMinutes() / 60 * 2 * Math.PI,
            h = time.getHours() % 12 / 12 * 2 * Math.PI;
        this.drawBackground();
        //绘制时分秒针
        this.ctx.closePath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.sin(h) * 50, -Math.cos(h) * 50);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.sin(m) * 70, -Math.cos(m) * 70);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.sin(s) * 85, -Math.cos(s) * 85);
        this.ctx.stroke();
    },

    run: function (){
        var now = this;
        this.init();
        this.drawContext();
        setInterval(function(){
            now.clear();
            now.drawContext();
        }, 1000);
    }
};



//主页联系模块
var contact = {
    icon: $("#icon-contact"),
    info: $("#info-contact"),
    contact: $("#index-contact"),
    mail: $("#mail-to"),
    text: $("#mail-to").find("textarea"),
    a: $("#mail-to").find("a"),
    href: '',
    url: '',
    screen: 0,
    run: function () {
        var that = this,
            show = function (event) {
                that.url = event.target.style.background;
                if (that.url.indexOf("mail") > -1) {
                    that.info.css("background", "none");
                    that.info.text("fuyi1205@126.com");
                    that.mail.slideDown();
                } else {
                    that.info.text("");
                    that.mail.slideUp();
                    if (that.url.indexOf("qq") > -1) {
                        that.info.css("background", "url('src/img/info/qq.jpg') center");
                    }
                    if (that.url.indexOf("weixin") > -1) {
                        that.info.css("background", "url('src/img/info/weixin.png') center");
                    }
                    if (that.url.indexOf("weibo") > -1) {
                        that.info.css("background", "url('src/img/info/weibo.png') center");
                    }
                }
            },
            hide = function (event) {
                that.url = event.target.style.background;
                that.info.css("background", "none");
                if (that.url.indexOf("mail") == -1) {
                    that.info.css({background: 'url("src/img/info/face.png")'}).text("");
                }
            },
            hide2 = function () {
                that.mail.slideUp();
                that.info.css({background: 'url("src/img/info/face.png")'}).text("");
            },
            send = function () {
                if (that.text.val().length == 0) {
                    alert("hey!一言不发我很伤心~");
                } else {
                    that.href = a.attr("href");
                    that.href = this.href + "?subject=" + encodeURIComponent("对博客的建议") + "&body=" + encodeURIComponent(that.text.val());
                    that.a.attr("href", info);
                }
            },
            reset = function () {
                that.text.val("");
                that.a.attr("href", "mailto:fuyi1205@126.com?subject=对博客的建议");
            };
        if (document.documentElement.offsetWidth > 768) {
            this.icon.delegate("li", "mouseenter", show).delegate("li", "mouseleave", hide);
        } else {
            this.icon.delegate("li", "touchstart", show).delegate("li", "touchend", hide);
        }
        this.contact.on("mouseleave", hide2);
        this.mail.delegate("a", "mousedown", send).delegate("button:eq(1)", "click", reset);
    }
};
//菜单栏效果
(function () {
    var showMenu = null,
        shutMenu = null,
        menu_li = $(".dropdown");

    //修复a标签跳转问题
    $(document).on("mousedown", "a.dropdown-desktop", function () {
        var url = $(this).attr("href");
        switch (url) {
            case "/blog/":
                window.location.pathname = "/blog/";
                break;
            case "/tank/":
                window.location.pathname = "/tank/";
                break;
            case "/san/":
                window.location.pathname = "/san/";
        }
    }).on("mouseenter", "a.dropdown-desktop", function () {
        clearTimeout(showMenu);
        var now = $(this);
        showMenu = setTimeout(function () {
            now.next().slideDown();
        }, 100);
    }).on("mouseleave", ".view-desktop .dropdown", function () {
        clearTimeout(shutMenu);
        shutMenu = setTimeout(function () {
            menu_li.find("ul").slideUp();
        }, 100);
    });


    //页面跳转时菜单高亮
    var path = window.location.pathname,
        reg = /\/\d{4}\/\d{2}\/\d{2}\/\w+\.html/;
    menu_li.prev().removeClass("active");
    menu_li.removeClass("active");
    switch (path) {
        case "/":
            menu_li.eq(0).prev().addClass("active");
            break;
        case "/blog/":
            menu_li.eq(0).addClass("active");
            $("#show-info").addClass("active");
            break;
        case "/tank/":
            menu_li.eq(1).addClass("active");
            menu_li.eq(1).find("li").eq(0).addClass("active");
            break;
        case "/san/":
            menu_li.eq(2).addClass("active");
            menu_li.eq(2).find("li").eq(0).addClass("active");
            break;
    }
    //博文正文菜单高亮显示
    if (reg.test(path)) {
        menu_li.eq(0).addClass("active");
    }

})();

//博客界面仅显示h3摘要
(function () {
    if (window.location.pathname.indexOf("blog") > 0) {
        var article = $(".article-h3"),
            date = $(".article-date");
        article.find(".con-title, .con-date").hide();
        article.find(".con-content").find("*").not("h3").hide();
        //日期格式改变
        for (var item = 0, len = date.length; item < len; item ++) {
            date.eq(item).text(date.eq(item).text().substring(0, 10));
        }
        //切换缩略图与信息图
        $("#hide-info").click(function () {
            article.slideUp(200);
            $(this).prev().removeClass("active");
            $(this).addClass("active");
        });

        $("#show-info").click(function () {
            article.slideDown(200);
            $(this).next().removeClass("active");
            $(this).addClass("active");
        });

        //博文搜索功能实现
        var search = {
            key: $("#search-key"),
            button1: $("#search-button"),
            button2: $("#reset-button"),
            articles: $(".article-li"),
            titles: $(".article-title"),
            result: false,
            start: function () {
                if (search.key.val().length == 0) {
                    alert("请输入搜索内容！");
                } else {
                    for (var i = 0, len = search.titles.length; i < len; i++) {
                        if (search.titles.eq(i).text().toLowerCase().indexOf(search.key.val().toLowerCase()) == -1) {
                            search.articles.eq(i).hide();
                        } else {
                            search.result = true;
                        }
                    }
                    if (search.result == false) {
                        search.articles.show();
                        alert("没有符合条件的博文！");
                    }
                }
            }
        };

        $("#blog-search").delegate("#search-button", "click", function () {
            search.start();
        }).delegate("input", "keydown", function (event) {
            if (event.keyCode == 13) {
                search.start();
            }
        }).delegate("#reset-button", "click", function () {
            search.articles.show();
        });
    }
})();

//三国人物瀑布流(Masonry)
(function () {
    if (window.location.pathname.indexOf("san") != -1) {
        var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
        });

        $grid.imagesLoaded().progress(function () {
            $grid.masonry();
        });
    }
})();

//登录模块控制
(function (){
    $(document).on("click", "#register-login-btn", function (){
        $(".log-form").fadeToggle();
    }).on("click", ".shut-login", function (){
        $(".log-form").fadeOut();
    });
})();

//canvas时间模块控制
(function (){
    var clock = $("#canvas-clock");
    if(window.location.pathname == "/"){
        clock.fadeIn();
        contact.run();
    }
    canvasClock.run();
    $(document).on("click", "#toggle-canvas-clock", function (){
        clock.fadeToggle();
        if(window.location.pathname !== "/"){
            $(".bg-con").toggleClass("bg-con-opac");
        }
    });
})();




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






