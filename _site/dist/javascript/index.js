!function(){var e=$(".view-desktop .dropdown"),t=e.find("a"),i=null,n=null;t.bind("mouseenter",function(){clearTimeout(i);var e=$(this);i=setTimeout(function(){e.next().slideDown()},100)}).bind("click",function(e){var t=e.target.getAttribute("href");switch(t){case"/blog/":window.location.pathname="/blog/";break;case"/tank/":window.location.pathname="/tank/";break;case"/san/":window.location.pathname="/san/"}}),e.bind("mouseleave",function(){clearTimeout(n);var e=$(this);n=setTimeout(function(){e.find("ul").slideUp()},100)});var a=window.location.pathname,o=/\/\d{4}\/\d{2}\/\d{2}\/\w+\.html/;switch(e.prev().removeClass("active"),e.removeClass("active"),a){case"/":e.eq(0).prev().addClass("active");break;case"/blog/":e.eq(0).addClass("active"),e.eq(0).find("#show-info").addClass("active");break;case"/tank/":e.eq(1).addClass("active"),e.eq(1).find("li").eq(0).addClass("active");break;case"/san/":e.eq(2).addClass("active"),e.eq(2).find("li").eq(0).addClass("active")}o.test(a)&&e.eq(0).addClass("active")}(),function(){var e,t=$("#icon-contact"),i=$("#info-contact");t.delegate("li","mouseenter",function(t){e=t.target.style.background,e.indexOf("mail")>-1?(i.css("background","none"),i.text("fuyi1205@126.com"),$("#mail-to").slideDown()):(i.text(""),$("#mail-to").slideUp(),e.indexOf("qq")>-1&&i.css("background","url('src/img/info/qq.jpg') 50% 50%"),e.indexOf("weixin")>-1&&i.css("background","url('src/img/info/weixin.png')"),e.indexOf("weibo")>-1&&i.css("background","url('src/img/info/weibo.png')"))}).delegate("li","mouseleave",function(t){e=t.target.style.background,i.css("background","none"),e.indexOf("mail")==-1&&i.css({background:'url("src/img/info/face.png")'}).text("")}),$("#index-contact").bind("mouseleave",function(){$("#mail-to").slideUp(),i.css({background:'url("src/img/info/face.png")'}).text("")})}(),function(){var e,t=$("#mail-to"),i=t.find("textarea"),n=$("div#mail-to a");t.delegate("a","mousedown",function(){0==i.val().length?alert("hey!一言不发我很伤心~"):(e=n.attr("href"),e=e+"?subject="+encodeURI("对博客的建议")+"&body="+encodeURI(i.val()),n.attr("href",e))}).delegate("button:eq(1)","click",function(){i.val(""),n.attr("href","mailto:fuyi1205@126.com?subject=对博客的建议")})}(),function(){if(window.location.pathname.indexOf("blog")>0){var e=$(".article-h3"),t=$(".article-date");e.find(".con-title, .con-date").hide(),e.find(".con-content").find("*").not("h3").hide();for(var i in t.get())t.eq(i).text(t.eq(i).text().substring(0,10));$("#hide-info").click(function(){e.slideUp(200),$(this).prev().removeClass("active"),$(this).addClass("active")}),$("#show-info").click(function(){e.slideDown(200),$(this).next().removeClass("active"),$(this).addClass("active")});var n={key:$("#search-key"),button1:$("#search-button"),button2:$("#reset-button"),articles:$(".article-li"),titles:$(".article-title"),result:!1,start:function(){if(0==n.key.val().length)alert("请输入搜索内容！");else{for(var e=0,t=n.titles.length;e<t;e++)n.titles.eq(e).text().toLowerCase().indexOf(n.key.val().toLowerCase())==-1?n.articles.eq(e).hide():n.result=!0;0==n.result&&(n.articles.show(),alert("没有符合条件的博文！"))}}};$("#blog-search").delegate("#search-button","click",function(){n.start()}).delegate("input","keydown",function(){13==event.which&&n.start()}).delegate("#reset-button","click",function(){n.articles.show()})}}(),function(){if(window.location.pathname.indexOf("san")!=-1){var e=$(".grid").masonry({itemSelector:".grid-item",percentPosition:!0,columnWidth:".grid-sizer"});e.imagesLoaded().progress(function(){e.masonry()})}}(),navigator.geolocation.getCurrentPosition(function(e){console.log(e.coords.latitude+"and"+e.coords.longitude)});