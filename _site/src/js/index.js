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


//联系信息效果
(function () {
    var icon = $("#icon-contact"),
        info = $("#info-contact"),
        url;
    icon.delegate("li", "mouseenter", function (event) {
        url = event.target.style.background;
        if (url.indexOf("mail") > -1) {
            info.css("background", "none");
            info.text("fuyi1205@126.com");
            $("#mail-to").slideDown();
        } else {
            info.text("");
            $("#mail-to").slideUp();
            if (url.indexOf("qq") > -1) {
                info.css("background", "url('src/img/info/qq.jpg') 50% 50%");
            }
            if (url.indexOf("weixin") > -1) {
                info.css("background", "url('src/img/info/weixin.png')");
            }
            if (url.indexOf("weibo") > -1) {
                info.css("background", "url('src/img/info/weibo.png')");
            }
        }
    }).delegate("li", "mouseleave", function (event) {
        url = event.target.style.background;
        info.css("background", "none");
        if (url.indexOf("mail") == -1) {
            info.css({background: 'url("src/img/info/face.png")'}).text("");
        }
    });
    $("#index-contact").bind("mouseleave", function () {
        $("#mail-to").slideUp();
        info.css({background: 'url("src/img/info/face.png")'}).text("");
    })
})();

//发送建议邮件
(function () {
    var mail = $("#mail-to"),
        text = mail.find("textarea"),
        a = $("div#mail-to a"),
        info;

    mail.delegate("a", "mousedown", function () {
        if (text.val().length == 0) {
            alert("hey!一言不发我很伤心~");
        } else {
            info = a.attr("href");
            info = info + "?subject=" + encodeURI("对博客的建议") + "&body=" + encodeURI(text.val());
            a.attr("href", info);
        }
    }).delegate("button:eq(1)", "click", function () {
        text.val("");
        a.attr("href", "mailto:fuyi1205@126.com?subject=对博客的建议");
    });
})();

//博客界面仅显示h3摘要
(function () {
    if (window.location.pathname.indexOf("blog") > 0) {
        var article = $(".article-h3"),
            date = $(".article-date");
        article.find(".con-title, .con-date").hide();
        article.find(".con-content").find("*").not("h3").hide();
        //日期格式改变
        for (var item in date.get()) {
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
                    for (var i = 0, length = search.titles.length; i < length; i++) {
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
        }).delegate("input", "keydown", function () {
            if (event.which == 13) {
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

//登录注册模块，学习使用IndexedDB
(function (){
    var form = $(".log_form");
    $(document).on("click", ".register", function (){
        form.fadeToggle();
        $("#log_in").hide();
    }).on('click', ".loginIn", function (){
        form.fadeToggle();
        $("#log_in").show();
    });
})();

// (function (){
//     $(".grid.item img").on("load", function (){
//        $(".grid").css("height", "auto");
//     });
// })();
(function (){
    var defereds = [];
    $(".grid.item img").each(function() {
        var dfd = $.Deferred();
        $(this).load(dfd.resolve);
        defereds.push(dfd);
    });
    $.when.apply(null, defereds).done(function() {
        $(".grid").css("height", "auto");
    });
})();



