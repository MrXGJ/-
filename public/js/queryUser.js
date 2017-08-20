$(document).ready(function () {

    //查询按钮的事件
    $("#queryButton").click(function () {
        $.post("/adminHome/queryUserData",
            {
                searchCondition:$("#searchCondition"),
                creditFrom:$("#creditFrom"),
                creditTo:$("#creditTo")
            },
            function (data) {

                //先删除上次的查询信息
                $(".queryR").remove();

                //根据查询结果填写表格
                var result = data.result;//json格式参考模拟数据函数getData
                var length = result.length;
                var displayLength = 12;
                createRow(result,length,displayLength);

            }
        )
    });

    //关闭详细窗口
    $("#closeW").click(function () {
        $(".subWindow").css("display","none");
    });

    //详细窗口可移动化
    enableDrag($(".subWindow"),$(".subWindow"));

});


//模拟数据
// function getData(){
//     var result = [];
//     for(var i = 0 ; i < 120; i++){
//         result[i] = {};
//         result[i].acc = "账号"+i;
//         result[i].nickname = "昵称"+i;
//         result[i].name = "姓名"+i;
//         result[i].college = "学院"+i;
//         result[i].credit = "信用"+i;
//     }
//     return result;
// }

//根据数据创建表格行
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

//实现窗口可拖动
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
            $.post("/adminHome/userDetail",
                {
                    acc:$(element).attr("data-acc")
                },
                function (data) {


                    $("#photo").attr("src",data.photo);
                    $("#studentCard").attr("src",data.studentCard);
                    $("#acc").val(data.acc);
                    $("#nickname").val(data.nickname);
                    $("#credit").val(data.credit);
                    $("#name").val(data.name);
                    $("#sex").val(data.sex);
                    $("#college").val(data.college);
                    $("#studentID").val(data.studentID);

                }
            )
        })
    });
}