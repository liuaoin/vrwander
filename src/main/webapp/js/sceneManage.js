window.onload = function(){
    layui.use(['layer','laypage'], function () {
        window.layer = layui.layer;
        window.laypage = layui.laypage;
    });
    $('.menu_head',parent.document).eq(2).click(function () {
        sceneManage(null,null,1);
    });
    $('#search_scene',parent.document).click(function () {
        sceneManage(null,null,1);
    });
    $('#search').click(function () {
        var name = $('#name').val().trim();
        var time = $('#time').val().trim();
        sceneManage(name,time,null);
    });

    $('#add').click(function () {
        var html = "<div class='common'><div ><span>场景名称：</span><input id='name' type='text'/></div>" +
            "<div ><span>场景路径：</span><input id='panorama' type='text'/></div>" +
            "<div ><span>北偏移：</span><input id='northOffset' type='text'/></div>" +
            "<div><span>水平偏移：</span><input id='yaw' type='number'/></div>" +
            "<div><span>垂直偏移：</span><input id='pitch' type='number'/></div>" +
            "<div><span>视野范围：</span><input id='hfov' type='number'/></div></div>"
        layer.open({
            title: '添加场景',
            type: 1,
            content: html,
            area: '350px',
            btn: ['确认', '取消'],
            skin: 'custom',
            yes: function () {
                var name = $('#name').val().trim();
                var panorama = $('#panorama').val().trim();
                var northOffset = $('#northOffset').val().trim();
                var yaw = $('#yaw').val().trim();
                var pitch = $('#pitch').val().trim();
                var hfov = $('#hfov').val().trim();
                $.ajax({
                    type: 'post',
                    url: '/vrwander/scene/addScene',
                    dataType: 'json',
                    data: {
                        name: name,
                        panorama: panorama,
                        northOffset: northOffset,
                        yaw: yaw,
                        pitch: pitch,
                        hfov: hfov
                    },
                    success: function (result) {
                        if(result.message != null) {
                            layer.alert('添加成功！',{icon: 1});
                        }else {
                            layer.alert('添加失败！',{icon: 2});
                        }
                    }
                });
                layer.close(index);
            }
        });
    });

    $('.area').on('click', '#update' ,function () {
        var sceneId = $(this).parent().siblings('td').eq(1).text();
        var scenename = $(this).parent().siblings('td').eq(2).text();
        var yaw = $(this).parent().siblings('td').eq(3).text();
        var pitch = $(this).parent().siblings('td').eq(4).text();
        var northOffset = $(this).parent().siblings('td').eq(5).text();
        var html = "<div class='common'><div><span>场景名称：</span><input id='scenename' type='text' value="+ scenename + "></div>" +
            "<div ><span>场景路径：</span><input id='panorama' type='text'></div>" +
            "<div ><span>北偏移：</span><input id='northOffset' type='text' value="+ northOffset + "></div>" +
            "<div><span>水平偏移：</span><input id='yaw' type='number' value="+ yaw + "></div>" +
            "<div><span>垂直偏移：</span><input id='pitch' type='number' value="+ pitch + "></div>" +
            "<div><span>视野范围：</span><input id='hfov' type='number'></div></div>"
            layer.open({
                title: '修改场景',
                type: 1,
                content: html,
                area: '350px',
                btn: ['确认', '取消'],
                skin: 'custom',
                yes: function (index) {
                    var name = $('#scenename').val().trim();
                    var panorama = $('#panorama').val().trim();
                    var northOffset = $('#northOffset').val().trim();
                    var yaw = $('#yaw').val().trim();
                    var pitch = $('#pitch').val().trim();
                    var hfov = $('#hfov').val().trim();
                    $.ajax({
                        type: 'post',
                        url: '/vrwander/scene/updateScene',
                        dataType: 'json',
                        data: {
                            sceneId: sceneId,
                            name: name,
                            panorama: panorama,
                            northOffset: northOffset,
                            yaw: yaw,
                            pitch: pitch,
                            hfov: hfov
                        },
                        success: function (result) {
                            if(result.code == true) {
                                layer.alert('修改成功！',{icon: 1});
                                sceneManage(null,null,1);
                            }else {
                                layer.alert('修改失败！',{icon: 2});
                            }
                        }
                    });
                    layer.close(index);
                }
        });
    });

    $('.area').on('click', '#delete' ,function () {
        var sceneId = $(this).parent().siblings('td').eq(1).text();
        layer.confirm('确定要删除选定的场景吗？',{icon: 3, title: '删除场景'},
            function(index) {
                $.ajax({
                    type: 'post',
                    url: '/vrwander/scene/deleteScene',
                    dataType: 'json',
                    data: {
                        sceneId: sceneId
                    },
                    success: function (result) {
                        if (result.code == true) {
                            layer.alert('删除成功！', {icon: 1});
                            sceneManage(null, null, 1);
                        } else {
                            layer.alert('删除失败！', {icon: 2});
                        }
                    }
                });
                layer.close(index);
            }
        );
    });

    $('#deleteSelect').click(function () {
        var scenes = [];
        $('.check').each(function () {
            if($(this).prop('checked') == true) {
                var sceneId = $(this).parent().next().text();
                scenes.push(sceneId);
            }
        });
        layer.confirm('确认要删除选中场景吗？', {icon: 3, title: '删除场景'},
            function (index) {
                $.ajax({
                    type: 'post',
                    url: '/vrwander/scene/deleteSelect',
                    dataType: 'json',
                    traditional: true,
                    data: {
                        scenes: scenes
                    },
                    success: function (result) {
                        if (result.code == true) {
                            layer.alert('删除成功！', {icon: 1});
                            sceneManage(null, null, 1);
                        } else {
                            layer.alert('删除失败！', {icon: 2});
                        }
                    }
                });
                layer.close(index);
            }
        );
    });

    function sceneManage(name,time,curr) {
        $.ajax({
            type: 'post',
            url: '/vrwander/scene/findSceneByCondition',
            dataType: 'json',
            data: {
                name: (name == '全部') ? '' : name,
                time: time,
                pageNum: curr ? curr : 1,
                pageSize: 10
            },
            success: function (result) {
                var page = result.obj;
                var html = "";
                if(page.list != null) {
                    $.each(page.list,function (i,item) {
                        html += "<tr><td width='6%'>"+ "<input class='check' type='checkbox'>" + "</td>" +
                            "<td width='10%' title= " + item.sceneId + ">" + item.sceneId + "</td>" +
                            "<td width='10%'>"+ item.name + "</td>" +
                            "<td width='12%' title=" + item.yaw + ">"+ item.yaw + "</td>" +
                            "<td width='12%' title=" + item.pitch + ">"+ item.pitch + "</td>" +
                            "<td width='12%'>"+ item.northOffset + "</td>" +
                            "<td width='10%'>"+ item.hotSpots.length + "</td>" +
                            "<td width='14%'>"+ item.time + "</td>" +
                            "<td width='16%'>"+ "<a id='update' href='#'>修改</a>&nbsp;&nbsp;&nbsp;<a id='delete' href='#'>删除</a>"  + "</td></tr>"
                    });
                }else {
                    html = "<tr><td colspan='9'>无数据</td></tr>";
                }
                $('tbody').html(html);

                //分页信息
                var totalCount = page.totalCount,
                    pageNum = page.pageNum,
                    pageSize = page.pageSize;
                laypage.render({
                    elem: 'pageText',
                    count: totalCount,
                    limit: pageSize,
                    curr: pageNum,
                    groups: 3,
                    prev: '<',
                    next: '>',
                    layout: ['prev','page','next','count'],
                    jump: function (obj, first) {
                        if(!first) {
                            sceneManage(name,time,obj.curr);
                        }
                    }
                });
            }
        });
    };

    $('.area').on('dblclick','tr',function () {
        var name = $(this).children('td').eq(2).text();
        window.parent.postMessage(name,'*');
    });
}



