
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
        $("#queryUserHtml").width($("#navigation").width())
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
            $(".subHtml").html(data);
        });
    })


    //查询按钮的事件
    $("#queryButton").click(function () {

    });

    //根据查询结果填写表格
    var result = getData();
    var length = result.length;
    var displayLength = 12;
    createRow(result,length,displayLength);

    //关闭评审领域窗口
    $("#closeW").click(function () {
        $(".subWindow").css("display","none");
    });

    //评审领域窗口可移动化
    enableDrag($(".subWindow"),$(".subWindow"));



});

//模拟数据
function getData(){
    var result = [];
    for(var i = 0 ; i < 120; i++){
        result[i] = {};
        result[i].acc = "账号"+i;
        result[i].nickname = "昵称"+i;
        result[i].name = "姓名"+i;
        result[i].college = "学院"+i;
        result[i].credit = "信用"+i;
    }
    return result;
}

function createRow(result,length,displayLength){
    if(length > displayLength){

        //先添加行
        for(var i = 0; i < displayLength; i++){
            $("#queryTable").append(
                "<tr class = 'queryR' style='text-align: center'>" +
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td><button class = 'displayButton'>查看详细信息</button></td>"+
                "</tr>"
            );
        }
        //添加尾部行选择页面
        $("#queryTable").append(
            "<tr class = 'queryR' style='text-align: left'>" +
            "<td colspan='6' id = 'selectPage' >" +
            "<label id = 'lastPage'>&nbsp;&nbsp;上一页</label>"+
            "</td>"+
            "</tr>"
        );
        for(var j = 0;j < Math.ceil(length/displayLength); j++ ){//页数
            $("#selectPage").append(
                "<label class = 'pageNum'></label>"
            );
            $(".pageNum:eq("+j+")").html("&nbsp;"+(j+1));

        }
        $("#selectPage").append(
            "<label id = 'nextPage'>&nbsp;下一页</label>"
        );
        //尾部行css
        $("#selectPage").css({"color":"#0c1eff","background":"#56abe4"});
        $(".pageNum,#lastPage,#nextPage").css({"cursor":"pointer"});


        //鼠标移动选择页面的颜色变化
        $(".pageNum").each(function (index, element) {
            $(element).mouseover(function () {
                if(index != parseInt($("#selectPage").attr("data-select"))){
                    $(element).css({"color":"#ff7968"});
                }
            })
                .mouseout(function () {
                    if(index != parseInt($("#selectPage").attr("data-select"))){
                        $(element).css({"color":"#0c1eff"});
                    }
                })
        });
        $("#lastPage,#nextPage").each(function (index, element) {
            $(element).mouseover(function () {
                $(element).css({"color":"#ff7968"});
            })
                .mouseout(function () {
                    $(element).css({"color":"#0c1eff"});
                })
        });


        //选择页面数字的点击事件注册（根据事件显示不同页数据）
        $(".pageNum").each(function (index, element) {
            $(element).click(function () {
                //显示数据
                for(var i = 0; i < displayLength; i++){
                    if(i+index*displayLength < length){
                        $(".queryCol:eq("+(i*5)+")").html(result[i+index*displayLength].acc);
                        $(".queryCol:eq("+(i*5+1)+")").html(result[i+index*displayLength].nickname);
                        $(".queryCol:eq("+(i*5+2)+")").html(result[i+index*displayLength].name);
                        $(".queryCol:eq("+(i*5+3)+")").html(result[i+index*displayLength].college);
                        $(".queryCol:eq("+(i*5+4)+")").html(result[i+index*displayLength].credit);
                        $(".displayButton:eq("+(i)+")").attr("data-acc",result[i+index*displayLength].acc)
                            .css("display",'');
                    }
                    else {
                        $(".queryCol:eq("+(i*5)+")").html("");
                        $(".queryCol:eq("+(i*5+1)+")").html("");
                        $(".queryCol:eq("+(i*5+2)+")").html("");
                        $(".queryCol:eq("+(i*5+3)+")").html("");
                        $(".queryCol:eq("+(i*5+4)+")").html("");
                        $(".displayButton:eq("+(i)+")").css("display","none");
                    }
                }
                //颜色变化以及选中页的标记
                $(".pageNum:not(element)").css("color","#0c1eff");
                $(element).css("color","#ff442c");
                $("#selectPage").attr("data-select",index);
            })
        });

        //默认选择第一页
        $(".pageNum:eq(0)").click();

        //上一页，下一页事件
        $("#lastPage").click(function () {
            var index = parseInt($("#selectPage").attr("data-select")) ;//当前页的索引
            if(index > 0){
                $(".pageNum:eq("+(index - 1)+")").click();
            }
        });
        $("#nextPage").click(function(){
            var index = parseInt($("#selectPage").attr("data-select")) ;//当前页的索引
            if(index < Math.ceil(length/displayLength)){
                $(".pageNum:eq("+(index + 1)+")").click();
            }
        });

    }
    else{
        for(var i = 0; i < length; i++){
            $("#queryTable").append(
                "<tr class = 'queryR'style='text-align: center'>" +
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td class = 'queryCol'></td>"+
                "<td><button class = 'displayButton'>查看详细信息</button></td>"+
                "</tr>"
            );
            $(".queryCol:eq("+(i*5)+")").html(result[i].acc);
            $(".queryCol:eq("+(i*5+1)+")").html(result[i].nickname);
            $(".queryCol:eq("+(i*5+2)+")").html(result[i].name);
            $(".queryCol:eq("+(i*5+3)+")").html(result[i].college);
            $(".queryCol:eq("+(i*5+4)+")").html(result[i].credit);
            $(".displayButton:eq("+(i)+")").attr("data-acc",result[i].acc);
        }
    }
    addDisplayEvent();//为查看详细信息添加事件

}

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


//为查看详细信息添加事件
function addDisplayEvent(){
    $(".displayButton").each(function (index, element) {
       $(element).click(function () {
           $(".subWindow").css("display","block");

           //设置属性------post请求


       })

    });
}