$(function() {
    $('#remember').prop('checked',true);
    checkCookie();
    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1)
            {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";",c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    }

    function setCookie(c_name,value,expiredays)
    {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

    function checkCookie()
    {
        var c_username = getCookie('username');
        var c_password = getCookie('password');
        if (username != null && username != "") {
            $('#username').val(c_username);
            $('#password').val(c_password);
        }
    }

    function clearCookie() {
        var domain = '.'+location.host;
        var keys = document.cookie.match(/[^=;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length; i--;) {
                var date=new Date();
                date.setDate(date.getDate() - 1000);
                document.cookie=keys[i]+"=; expires="+date.toGMTString();
            }
        }
    }

    layui.use('layer', function(){
        window.layer = layui.layer;
    });
    function keyLogin(){
        if (event.keyCode == 13)
            document.getElementById("login").click();
    }
    $("#login").click(function(e) {
        e.preventDefault();
         var username = $("#username").val().trim();
         var password = $("#password").val().trim();
         if(username == "") {
             layer.msg('请输入用户名！',{icon: 0});
             $("#username").focus();
         }else if(password == "") {
             layer.msg('请输入密码！',{icon: 0});
             $("#password").focus();
         }else {
             $.ajax({
                 type: "post",
                 url: "/vrwander/user/loginCheck",
                 dataType: "json",
                 data: {
                     username:username,
                     password:password
                 },
                 success: function(result) {
                    if(result.message == 'success') {
                        if($('#remember').prop('checked') == true) {
                            var username = $('#username').val().trim();
                            var password = $('#password').val().trim();
                            setCookie('username',username,365);
                            setCookie('password',password,365);
                        }else {
                            clearCookie();
                        }
                        window.location.href="index.html";
                    }else {
                        layer.alert('用户名或密码错误！',{icon: 2});
                    }
                 }
             });
         }
    });

});