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