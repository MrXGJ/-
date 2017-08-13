/**
 * Created by ASUS on 2017/8/13.
 */
$(document).ready(function(){
    $("#loginButton").click( function() {
        $.get("/login_verify",
            {
                username: $("#name").val(),
                password: $("#password").val()
            },
            function (data) {
                if(data.verify === true){
                    location.href = '/adminHome';//跳转到管理员首页
                 }
                else {
                    alert("角色，用户名或者密码不正确!");
                }
            });
    });
});
