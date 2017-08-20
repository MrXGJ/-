
$(document).ready(function () {


    //鼠标移动导航栏的颜色变化
    $(".options li").each(function (index, element) {
        $(element).mouseover(function () {
            $(element).css({"color":"#fdb6a2"});
        })
            .mouseout(function () {
                $(element).css({"color":"#d1d1d8"});
            })
    });

    //鼠标选择后导航栏的变化
    $(".options li").each(function (index, element) {
        $(element).click(function () {

            $(".options li:not(element)").css({"border":"none","background-color":"inherit"});

            $(element).css({"background-color":"#0369b3","border-left":"solid 1px #d1d1d8",
            "border-top":"solid 1px #d1d1d8","border-right":"solid 1px #d1d1d8",
                "border-bottom":"solid #0369b3 2px"});

        });

    });

    //默认进入首页
    setTimeout(function () {
        $("#firstPage").click();

    },100);

    //窗口变化时校准宽度
    $(window).resize(function () {
        // $("#firstPageHtml").width($("#navigation").width())
        //     .height(($(document).height()-120));
        $("#queryUserHtml,#firstPageHtml").width($("#navigation").width())
            .height(($(document).height()-120));
    });

    //点击加载首页
    $("#firstPage").click(function () {

        $.get("/adminHome/firstPage",function(data){
            $(".subHtml").html(data)
                .ready(function () {

                    //设置当前需要审核的注册用户的个数
                    $.get("/adminHome/registerCheck",
                        function (data) {
                            $("#checkNum").html("当前有"+data.CheckNum+"个用户注册需要审核！");
                        });

                    //校准宽度与高度
                    $("#firstPageHtml").width($("#navigation").width())
                        .height(($(document).height()-120));
                });
        });

    });

    //点击加载用户信息查询页面
    $("#queryUser").click(function(){
        $.get("/adminHome/queryUser",function(data){
            $(".subHtml").html(data)
                .ready(function () {
                    //校准宽度与高度
                    $("#queryUserHtml").width($("#navigation").width())
                        .height(($(document).height()-120));
                });
        });
    });


});

