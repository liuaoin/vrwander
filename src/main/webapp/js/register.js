$(function() {
    layui.use('layer', function(){
        window.layer = layui.layer;
    });
    $("#register").click(function (e) {
        e.preventDefault();
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();
        var passagain = $("#passagain").val().trim();
        if(username == "") {
            layer.msg('请输入用户名！',{icon: 0});
            $("#username").focus();
            return false;
        }else if(password == "") {
            layer.msg('请输入密码！',{icon: 0});
            $("#password").focus();
            return false;
        }else if(passagain == ""){
            layer.msg('请再次输入密码！',{icon: 0});
            $("#passagain").focus();
        }else if(password != passagain) {
            layer.alert('两次密码不一致！',{icon: 2});
        } else {
            $.ajax({
                type: "post",
                url: "/vrwander/user/register",
                dataType: "json",
                data: {
                    username:username,
                    password:password
                },
                success: function(result) {
                    if(result.message == "success") {
                        layer.alert('注册成功！',{icon: 1});
                        return false;
                    }else {
                        layer.alert('用户名已存在！',{icon: 2});
                        return false;
                    }
                }
            });
        }
    });
})
