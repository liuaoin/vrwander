window.onload = function() {
    layui.use(['layer','laypage'], function () {
        window.layer = layui.layer;
        window.laypage = layui.laypage;
    });
    $('#search_hot',parent.document).click(function () {
        hotManage(null,null,null,1);
    });

    $('#search').click(function () {
        var name = $('#name').val().trim();
        var type = "custom-common " + $('#type').val().trim();
        var time = $('#time').val().trim();
        hotManage(name,type,time,null);
    });

    $('.area').on('click', '#delete' ,function () {
        var id = $(this).parent().siblings('td').eq(1).text();
        layer.confirm('确定要删除选定的热点吗？',{icon: 3, title: '删除热点'},function () {
            $.ajax({
                type: 'post',
                url: '/vrwander/hotSpot/deleteHot',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (result) {
                    if (result.code == true) {
                        layer.alert('删除成功！', {icon: 1});
                        hotManage(null, null, null, 1);
                    } else {
                        layer.alert('删除失败！', {icon: 2});
                    }
                }
            });
        });
    });

    $('.area').on('click', '#update' ,function () {
        var id = $(this).parent().siblings('td').eq(1).text();
        var name = $(this).parent().siblings('td').eq(2).text();
        var yaw = $(this).parent().siblings('td').eq(3).text();
        var pitch = $(this).parent().siblings('td').eq(4).text();
        var sceneId = $(this).parent().siblings('td').eq(6).text();
        var type = $(this).parent().siblings('td').eq(5).text();
        var html = "<div class='common'><div><span>热点名称：</span><input id='hotName' type='text' value="+ name + "></div>" +
            "<div><span>水平偏移：</span><input id='yaw' type='number' value="+ yaw + "></div>" +
            "<div><span>垂直偏移：</span><input id='pitch' type='number' value="+ pitch + "></div>" +
            "<div ><span>当前场景：</span><input id='sceneId' type='text' value="+ sceneId + "></div>";
        if(type == '场景热点') {
            type = 'scene';
            html += "<div ><span>目标场景：</span><input id='targetSceneId' type='text'/></div></div>";
        }else if(type == '文本热点') {
            type = 'text';
            html += "<div><span>文本信息：</span><input id='text' type='text'/></div></div>"
        }else if(type == '链接热点') {
            type = 'url';
            html += "<div><span>链接信息：</span><input id='url' type='text'/></div></div>"
        }else if(type == '图片热点') {
            type = 'image';
            html += "<div><span>图片信息：</span><input id='image' type='text'/></div></div>"
        }else if(type == '音频热点') {
            type = 'video';
            html += "<div><span>音频信息：</span><input id='video' type='text'/></div></div>"
        }
        hotUpdate(id,html,type);
    });


    $('#deleteSelect').click(function () {
        var hots = [];
        $('.check').each(function () {
            if($(this).prop('checked') == true) {
                var id = $(this).parent().next().text();
                hots.push(id);
            }
        });
        if(hots.length == 0) {
            layer.alert('请选择要删除的数据！', {icon: 2});
        }else {
            layer.confirm('确认要删除选中热点吗？', {icon: 3, title: '删除热点'},
                function () {
                    $.ajax({
                        type: 'post',
                        url: '/vrwander/hotSpot/deleteSelect',
                        dataType: 'json',
                        traditional: true,
                        data: {
                            hots: hots
                        },
                        success: function (result) {
                            if (result.code == true) {
                                layer.alert('删除成功！', {icon: 1});
                                hotManage(null, null, null, 1);
                            } else {
                                layer.alert('删除失败！', {icon: 2});
                            }
                        }
                    });
                }
            );
        }
    });

    function hotUpdate(id,html,type) {
        var index = layer.open({
            title: '修改场景',
            type: 1,
            content: html,
            area: '350px',
            btn: ['确认', '取消'],
            skin: 'custom',
            yes: function () {
                var name = $('#hotName').val().trim();
                var yaw = $('#yaw').val().trim();
                var pitch = $('#pitch').val().trim();
                var hotSpot = {
                    id: id,
                    name: name,
                    yaw: yaw,
                    pitch: pitch
                };
                if(type == 'scene') {
                    var sceneId = $('#sceneId').val().trim();
                    var targetSceneId = $('#targetSceneId').val().trim();
                    hotSpot['sceneId'] = sceneId;
                    hotSpot['targetSceneId'] = targetSceneId;
                }else if(type == 'text') {
                    var text = $('#text').val().trim();
                    hotSpot['text'] = text;
                }else if(type == 'url') {
                    var url = $('#url').val().trim();
                    hotSpot['URL'] = url;
                }else if(type == 'image') {
                    var image = $('#image').val().trim();
                    hotSpot['image'] = image;
                }else {
                    var video = $('#video').val().trim();
                    hotSpot['video'] = video;
                }
                $.ajax({
                    type: 'post',
                    url: '/vrwander/hotSpot/updateHot',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(hotSpot),
                    success: function (result) {
                        if(result.code == true) {
                            layer.alert('修改成功！',{icon: 1});
                            hotManage(null,null,1);
                        }else {
                            layer.alert('修改失败！',{icon: 2});
                        }
                    }
                });
                layer.close(index);
            }
        });
    }
    function hotManage(name,type,time,curr) {
        $.ajax({
            type: 'post',
            url: '/vrwander/hotSpot/findHotByCondition',
            dataType: 'json',
            data: {
                name: (name == '全部') ? '' : name,
                cssClass: (type == '全部') ? '' : type,
                time: time,
                pageNum: curr ? curr : 1,
                pageSize: 10
            },
            success: function (result) {
                var page = result.obj;
                var html = "";
                if (page.list != null && page.list.length != 0) {
                    $.each(page.list, function (i, item) {
                        switch(item.cssClass) {
                            case 'custom-common scene':item.cssClass = '场景热点';break;
                            case 'custom-common text':item.cssClass = '文本热点';break;
                            case 'custom-common url':item.cssClass = '链接热点';break;
                            case 'custom-common image':item.cssClass = '图片热点';break;
                            case 'custom-common video':item.cssClass = '音频热点';break;
                        }
                        html += "<tr><td width='6%'>" + "<input class='check' type='checkbox'>" + "</td>" +
                            "<td width='8%' title=" + item.id + ">" + item.id + "</td>" +
                            "<td width='10%'>" + item.name + "</td>" +
                            "<td width='12%' title=" + item.yaw + ">" + item.yaw + "</td>" +
                            "<td width='12%' title=" + item.pitch + ">" + item.pitch + "</td>" +
                            "<td width='10%'>" + item.cssClass + "</td>" +
                            "<td width='10%'>" + item.scenes.name + "</td>" +
                            "<td width='10%'>" + item.targetSceneId + "</td>" +
                            "<td width='10%'>" + item.time + "</td>" +
                            "<td width='12%'>" + "<a id='update' href='#'>修改</a>&nbsp;&nbsp;&nbsp;<a id='delete' href='#'>删除</a>" + "</td></tr>"
                    });
                } else {
                    html = "<tr><td colspan='10'>无数据</td></tr>";
                }
                $('tbody').html(html);

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
                        if (!first) {
                            hotManage(name, type, time, obj.curr);
                        }
                    }
                });
            }
        });
    }

    $('.area').on('dblclick','tr',function () {
        var hotspot = {
            name: null,
            yaw: null,
            pitch: null
        };
        hotspot.name = $(this).children('td').eq(6).text();
        hotspot.yaw = $(this).children('td').eq(3).text();
        hotspot.pitch = $(this).children('td').eq(4).text();
        window.parent.postMessage(hotspot,'*');
    });

}



