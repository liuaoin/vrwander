$(document).ready(function () {
    init();
    layui.use('layer', function(){
        window.layer = layui.layer;
    });
    $('.menu_head').click(function () {
        $(this).addClass('current').siblings('.menu_head').removeClass('current');
        $(this).next('div').slideToggle(300).siblings('.menu_body').slideUp('slow');
    });
    $('.menu_head').eq(0).click();

    $.ajax({
        type: 'post',
        url: '/vrwander/user/getSession',
        dataType: 'json',
        success: function (result) {
            $('.head_right span').append(result.message);
        }
    });

    $('.menu_head').eq(0).click(function () {
        $('#content').css('display','block');
        $('#table1').css('display','none');
        $('#table2').css('display','none');
    });
    $('.menu_head').eq(2).click(function () {
        $('#content').css('display','none');
        $('#table1').css('display','block');
    });
    $('#search_scene').click(function () {
        $('#table1').css('display','block');
        $('#table2').css('display','none');
    });
    $('#search_hot').click(function () {
        $('#table1').css('display','none');
        $('#table2').css('display','block');
    });
    $(document).click(function(){
        $('.head_right ul').hide();
    });
    iframeOnClick.track(document.getElementById('content'),function(){
        $('.head_right ul').hide();
    });

    $('.head_right span').click(function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
    });

    $('li').eq(0).click(function () {
        window.location.href = "login.html";
    });

    $('li').eq(1).click(function () {
        var html = "<div class='common'><span>用户名：</span><input id='username' type='text'/></div>" +
            "<div class='common'><span>旧密码：</span><input id='oldpass' type='password'/></div>" +
            "<div class='common'><span>新密码：</span><input id='newpass' type='password'/></div>"
        layer.open({
            title: '修改密码',
            type: 1,
            content: html,
            area: ['300px','250px'],
            btn: ['确认','取消'],
            skin: 'custom',
            yes: function () {
                var username = $('#username').val().trim();
                var oldpass = $('#oldpass').val().trim();
                var newpass = $('#newpass').val().trim();
                $.ajax({
                    type: 'post',
                    url: '/vrwander/user/update',
                    dataType: 'json',
                    data: {
                        username: username,
                        oldpass: oldpass,
                        newpass: newpass
                    },
                    success: function (result) {
                        if(result.resultCode) {
                            layer.alert('修改成功！',{icon: 1});
                        }else {
                            layer.alert('用户名或密码错误！',{icon: 2});
                        }
                    },
                });
            },
        });
    });

    $('#init').click(function () {
        var scenes = param.scenes;
        var str = "<select id='name'>";
        for(var i in scenes) {
            str += "<option>" + scenes[i].name + "</option>"
        }
        str += "</select>";
        var html = "<div class='common'><div><span>author:</span><input id='author' type='text'/></div>" +
            "<div ><span>title:</span><input id='title' type='text'/></div>" +
            "<div><span>yaw:</span><input id='yaw' type='number'/></div>" +
            "<div><span>pitch:</span><input id='pitch' type='number'/></div>" +
            "<div><span>hfov:</span><input id='hfov' type='number'/></div>" +
            "<div><span>firstScene:</span>"+ str +"</div></div>"
        layer.open({
            title: '场景热点',
            type: 1,
            content: html,
            area: '350px',
            btn: ['确认', '取消'],
            skin: 'custom',
            yes: function (index) {
                var author = $('#author').val().trim();
                var title = $('#title').val().trim();
                var yaw = $('#yaw').val().trim();
                var pitch = $('#pitch').val().trim();
                var hfov = $('#hfov').val().trim();
                var firstScene = $("#name").val().trim();
                $.ajax({
                    type: 'post',
                    url: '/vrwander/initialConfig/updateDefault',
                    dataType: 'json',
                    data: {
                        author: author,
                        title: title,
                        yaw: yaw,
                        pitch: pitch,
                        hfov: hfov,
                        firstScene: firstScene
                    },
                });
                layer.close(index);
            }
        });
    });

    window.addEventListener('message',e => {
        if(typeof e.data === "object") {
            if(e.data.hasOwnProperty('panorama')) {
                document.getElementById('vr').contentWindow.loadImage(e.data.panorama);
            }else {
                document.getElementById('content').contentWindow.lookAt(e.data);
            }
        }else {
            document.getElementById('content').contentWindow.loadScene(e.data);
        }
    });

    $('#control').click(function () {
        $('#content').contents().find('#controls').toggle();
        $('#content').contents().find('#coords').toggle();
        $('#content').contents().find('#map').toggle();
        $('#content').contents().find('#vr').toggle();
        $('#content').contents().find('.pnlm-panorama-info').toggle();
        $('#content').contents().find('.pnlm-compass').toggle();
        $('#content').contents().find('.nav').toggle();
    });
});








