
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

    //关闭详细窗口
    $("#closeW").click(function () {
        $(".subWindow").css("display","none");
    });

    //详细窗口可移动化
    enableDrag($(".subWindow"),$(".subWindow"));


});

//窗口拖动
function enableDrag(obj,dragField){
    //窗口的移动实现
    var moveFlag = false;
    var dx,dy;//鼠标距离控件的相对位置

    //更新子窗口的位置
    dragField.mousedown(function (e) {
        moveFlag = true;
        dx = e.pageX - parseInt(obj.css("left"));//字符串转化为整数
        dy = e.pageY - parseInt(obj.css('top'));
    })
        .mousemove(function (e) {
            if(moveFlag){//移动鼠标时计算控件左上角的坐标
                var newX = e.pageX - dx;
                var newY = e.pageY - dy;
                obj.css({"left":newX,"top":newY});
            }

        })
        .mouseup(function () {
            moveFlag = false;
        });
}

