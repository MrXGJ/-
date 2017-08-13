/**
 * Created by ASUS on 2017/8/13.
 */
/**
 * Created by ASUS on 2017/7/15.
 */

$(document).ready(function () {


    //导航栏的颜色变化
    $(".options li").each(function (index, element) {
        $(element).mouseover(function () {
            $(element).css({"color":"#fdb6a2"});
        })
            .mouseout(function () {
                $(element).css({"color":"#272729"});
            })
    });


    //默认进入首页
    setTimeout(function () {
        $("#firstPage").click();
    },100);

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

                });
        });

    });

    //点击加载用户信息查询页面
    $("#queryUser").click(function(){
        $.get("/adminHome/queryUser",function(data){
            $(".subHtml").html(data);
        });
    })

});


