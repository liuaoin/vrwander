window.onload = function () {
    init();
    viewer = pannellum.viewer('container',param);
    layui.use('layer', function () {
        window.layer = layui.layer;
    });

    if(window.DeviceOrientationEvent){
        window.addEventListener('mousemove',DeviceOrientationHandler,false);
    }else{
        alert("您的浏览器不支持DeviceOrientation");
    }

    function DeviceOrientationHandler(event) {
        var nav = document.getElementsByClassName('nav')[0];
        nav.style.transform = "rotate(" + (viewer.getYaw()-viewer.getNorthOffset()) + "deg)";
        nav.style.webkitTransform = "rotate(" + (viewer.getYaw()-viewer.getNorthOffset()) + "deg)";
    }
}
/*移除热点选择栏*/
function removeHots() {
    var nodes = document.getElementById("container").childNodes;
    for(var j in nodes) {
        if(nodes[j] == ul) {
            while(nodes[j].hasChildNodes()) {
                nodes[j].removeChild(nodes[j].firstChild);
            }
        }
    }
    document.getElementById('container').removeChild(ul);
    document.removeEventListener("click",removeHots);
}

/*添加热点选择栏*/
var yaw,pitch;
var ul = document.createElement('ul');
function addHots() {
    var info = viewer.getHotSpotsInfo();
    pitch = info[0];
    yaw = info[1];
    ul.classList.add('choose_hots');
    var pos = viewer.getPosxy();
    ul.style.left = pos.x + 'px';
    ul.style.top = pos.y + 'px';
    var images = ["hotspots.svg","label.svg","link.svg","image.svg","video.svg"];
    var titles = ["scene","text","url","image","video"];
    for(var i = 0; i < images.length; i++) {
        var li = document.createElement('li');
        li.classList.add('choose_hot');
        var image = document.createElement('img');
        image.src = "../images/" + images[i];
        image.title = titles[i];
        image.classList.add('choose_hot_image');
        li.appendChild(image);
        ul.appendChild(li);
    }
    document.getElementById('container').appendChild(ul);
    document.removeEventListener("click",addHots);
    document.addEventListener("click",removeHots);
}

$("#container").on("click",".choose_hots li:eq(0)",function () {
    var html = "<div class='common'><div ><span>热点名称：</span><input id='hotName' type='text'/></div>" +
        "<div><span>水平偏移：</span><input id='targetYaw' type='number'/></div>" +
        "<div><span>垂直偏移：</span><input id='targetPitch' type='number'/></div>" +
        "<div><span>视野范围：</span><input id='targetHfov' type='number' value='100'/></div>" +
        "<div><span>目标场景：</span><input id='targetSceneName' type='text'/></div></div>"
    var index = layer.open({
        title: '场景热点',
        type: 1,
        content: html,
        area: '350px',
        btn: ['确认', '取消','选择场景'],
        skin: 'custom',
        yes: function (index) {
            var name = $('#hotName').val().trim();
            var targetYaw = $('#targetYaw').val().trim();
            var targetPitch = $('#targetPitch').val().trim();
            var targetHfov = $('#targetHfov').val().trim();
            var targetSceneName = $('#targetSceneName').val().trim();
            var sceneId = viewer.getScene();
            var text = "切换至" + targetSceneName + "场景";
            $.ajax({
                type: 'post',
                url: '/vrwander/scene/findSceneByName',
                dataType: 'json',
                data: {
                    name: targetSceneName,
                },
                success: function (result) {
                    var targetSceneId = result.obj.sceneId;
                    $.ajax({
                        type: 'post',
                        url: '/vrwander/hotSpot/saveSceneHot',
                        dataType: 'json',
                        data: {
                            name: name,
                            yaw: yaw,
                            pitch: pitch,
                            targetYaw: targetYaw,
                            targetPitch: targetPitch,
                            targetHfov: targetHfov,
                            targetSceneId: targetSceneId,
                            sceneId: sceneId,
                            cssClass: 'custom-common scene',
                            text: text
                        },
                        success: function (result) {
                            if(result.message != null) {
                                viewer.addHotSpot({
                                    id: result.message,
                                    targetSceneId: targetSceneId,
                                    yaw: yaw,
                                    pitch: pitch,
                                    cssClass: 'custom-common scene',
                                    text: text,
                                    targetYaw: targetYaw,
                                    targetPitch: targetPitch,
                                    targetHfov: targetHfov,
                                    sceneId: sceneId
                                });
                            }
                        }
                    });
                    layer.close(index);
                }
            })
        },
        btn3: function () {
            layer.open({
                title: '场景选择',
                type: 2,
                area: ['782px','400px'],
                content: 'carousel.html',
                btn: ['确认', '取消'],
                yes: function (index,layero) {
                    var body = layer.getChildFrame('body', index);
                    var yaw = body.find('#yaw').val();
                    var pitch = body.find('#pitch').val();
                    var sceneName = body.find('#sceneName').val();
                    $('#targetYaw').val(yaw);
                    $('#targetPitch').val(pitch);
                    $('#targetSceneName').val(sceneName);
                    layer.close(index);
                }
            });
            return false;
        }
    });
});

$("#container").on("click",".choose_hots li:eq(1)",function () {
    var html = "<div class='common'><div><span>热点名称：</span><input id='hotName' type='text'/></div>" +
        "<div><span>文本信息：</span><input id='text' type='text'/></div></div>"
    layer.open({
        title: '文本热点',
        type: 1,
        content: html,
        area: '300px',
        btn: ['确认', '取消'],
        skin: 'custom',
        yes: function (index) {
            var name = $('#hotName').val().trim();
            var text = $('#text').val().trim();
            var sceneId = viewer.getScene();
            $.ajax({
                type: 'post',
                url: '/vrwander/hotSpot/saveTextHot',
                dataType: 'json',
                data: {
                    name: name,
                    yaw: yaw,
                    pitch: pitch,
                    text: text,
                    sceneId: sceneId,
                    cssClass: 'custom-common text'
                },
                success: function (result) {
                    if(result.message != null) {
                        viewer.addHotSpot({
                            "id": result.message,
                            "text": text,
                            "yaw": yaw,
                            "pitch": pitch,
                            "cssClass": 'custom-common text'
                        });
                    }
                }
            });
            layer.close(index);
        },
    });
});

$("#container").on("click",".choose_hots li:eq(2)",function () {
    var html = "<div class='common'><div><span>热点名称：</span><input id='hotName' type='text'/></div>" +
        "<div><span>链接地址：</span><input id='URL' type='text'/></div></div>"
    layer.open({
        title: '链接热点',
        type: 1,
        content: html,
        area: '300px',
        btn: ['确认', '取消'],
        skin: 'custom',
        yes: function (index) {
            var name = $('#hotName').val().trim();
            var URL = $('#URL').val().trim();
            var sceneId = viewer.getScene();
            $.ajax({
                type: 'post',
                url: '/vrwander/hotSpot/saveURLHot',
                dataType: 'json',
                data: {
                    name: name,
                    yaw: yaw,
                    pitch: pitch,
                    URL: URL,
                    sceneId: sceneId,
                    cssClass: 'custom-common url'
                },
                success: function (result) {
                    if(result.message != null) {
                        viewer.addHotSpot({
                            "id": result.message,
                            "URL": URL,
                            "yaw": yaw,
                            "pitch": pitch,
                            "cssClass": 'custom-common url'
                        });
                    }
                }
            });
            layer.close(index);
        },
    });
});

$("#container").on("click",".choose_hots li:eq(3)",function () {
    var html = "<div class='common'><div><span>热点名称：</span><input id='hotName' type='text'/></div>" +
        "<div><span>图片地址：</span><input id='image' type='text'/></div></div>"
    layer.open({
        title: '图像热点',
        type: 1,
        content: html,
        area: '300px',
        btn: ['确认', '取消'],
        skin: 'custom',
        yes: function (index) {
            var name = $('#hotName').val().trim();
            var image = $('#image').val().trim();
            var sceneId = viewer.getScene();
            $.ajax({
                type: 'post',
                url: '/vrwander/hotSpot/saveImageHot',
                dataType: 'json',
                data: {
                    name: name,
                    yaw: yaw,
                    pitch: pitch,
                    image: image,
                    sceneId: sceneId,
                    cssClass: 'custom-common image'
                },
                success: function (result) {
                    if(result.message != null) {
                        viewer.addHotSpot({
                            "id": result.message,
                            "image": image,
                            "yaw": yaw,
                            "pitch": pitch,
                            "cssClass": 'custom-common image'
                        });
                    }
                }
            });
            layer.close(index);
        },
    });
});

$("#container").on("click",".choose_hots li:eq(4)",function () {
    var html = "<div class='common'><div><span>热点名称：</span><input id='hotName' type='text'/></div>" +
        "<div><span>音频地址：</span><input id='video' type='text'/></div></div>"
    layer.open({
        title: '音频热点',
        type: 1,
        content: html,
        area: '300px',
        btn: ['确认', '取消'],
        skin: 'custom',
        yes: function (index) {
            var name = $('#hotName').val().trim();
            var video = $('#video').val().trim();
            var sceneId = viewer.getScene();
            $.ajax({
                type: 'post',
                url: '/vrwander/hotSpot/saveVideoHot',
                dataType: 'json',
                data: {
                    name: name,
                    yaw: yaw,
                    pitch: pitch,
                    video: video,
                    sceneId: sceneId,
                    cssClass: 'custom-common video'
                },
                success: function (result) {
                    if(result.message != null) {
                        viewer.addHotSpot({
                            "id": result.message,
                            "yaw": yaw,
                            "pitch": pitch,
                            "video": video,
                            "cssClass": 'custom-common video'
                        });
                    }
                }
            });
            layer.close(index);
        },
    });
});

function removeHot() {
    viewer.setIsLoad(false);
    var flag = true;
    $('#container').on('click','.pnlm-hotspot-base',function (e) {
        if(flag) {
            flag = false;
            var temp = viewer.mouseEventToCoords(e);
            layer.confirm('确认要删除该热点吗？',{icon: 3, title: '删除热点'},
                function (index) {
                    var sceneId = viewer.getScene();
                    $.ajax({
                        type: 'post',
                        url: '/vrwander/hotSpot/removeHotSpot',
                        dataType: 'json',
                        data: {
                            pitch: temp[0],
                            yaw: temp[1],
                            sceneId: sceneId
                        },
                        success: function (result) {
                            var hotspot = result.obj;
                            var id = hotspot.id;
                            viewer.removeHotSpot(id,sceneId);
                            layer.close(index);
                        }
                    });
                }
            );
            viewer.setIsLoad(true);
        }
    });
};

function moveHotSpot() {
    var flag = false;
    $('#container').on('click','.pnlm-hotspot-base',function (e) {
        flag = true;
        $(this).css('cursor', 'move');
        var temp = viewer.mouseEventToCoords(e);
        e.stopPropagation();
        $(document).click(function (e) {
            if(!flag) {
                return;
            }
            flag = false;
            $(this).css('cursor', 'default');
            var coords = viewer.mouseEventToCoords(e);
            pitch = coords[0];
            yaw = coords[1];
            var sceneId = viewer.getScene();
            layer.confirm('确认要移动该热点吗？',{icon: 3, title: '移动热点'},
                function (index) {
                    $.ajax({
                        type: 'post',
                        url: '/vrwander/hotSpot/updateHotSpot',
                        dataType: 'json',
                        data: {
                            initPitch: temp[0],
                            initYaw: temp[1],
                            pitch: pitch,
                            yaw: yaw,
                            sceneId: sceneId
                        },
                        success: function (result) {
                            var hs = result.obj;
                            viewer.removeHotSpot(hs.id,sceneId);
                            viewer.addHotSpot(hs);
                            layer.close(index);
                        }
                    });
                }
            );
        });
        viewer.setIsLoad(true);
    });
}

$("#map area").click(function (event) {
    var name = $(this).attr('title')
    loadScene(name);
    var pos = getMousePos(event);
    $('.nav').css('left',pos[0]);
    $('.nav').css('top',pos[1]);
});

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return [x-15, y-15];
}

function loadScene(name) {
    $('div.menu_head',parent.document).eq(0).click();
    $.ajax({
        type: 'post',
        url: '/vrwander/scene/findSceneByName',
        dataType: 'json',
        data: {
            name: name
        },
        success: function (result) {
            var obj = result.obj;
            viewer.loadScene(obj.sceneId,obj.pitch,obj.yaw,obj.hfov);
        }
    });
}

function lookAt(hotspot) {
    loadScene(hotspot.name);
    var timer = setTimeout(function () {
        viewer.lookAt(hotspot.pitch>>0,hotspot.yaw>>0,100,2000);
    },2000);
}

$('#container').click(function (event) {
    var coords = viewer.mouseEventToCoords(event);
    $('#yaw').text(coords[1]);
    $('#pitch').text(coords[0]);
});


$('#vr').click(function () {
    var sceneId = viewer.getScene();
    var scene = {
        panorama: null
    };
    $.ajax({
        type: 'post',
        url: '/vrwander/scene/findSceneBySceneId',
        dataType: 'json',
        data: {
            sceneId: sceneId
        },
        success: function(result) {
            scene.panorama = result.obj.panorama;
            window.parent.postMessage(scene, '*');
        }
    });
});



/*自定义控制栏*/
document.getElementById('pan-up').addEventListener('click', function() {
    viewer.setPitch(viewer.getPitch() + 10);
});
document.getElementById('pan-down').addEventListener('click', function() {
    viewer.setPitch(viewer.getPitch() - 10);
});
document.getElementById('pan-left').addEventListener('click', function() {
    viewer.setYaw(viewer.getYaw() - 10);
});
document.getElementById('pan-right').addEventListener('click', function() {
    viewer.setYaw(viewer.getYaw() + 10);
});
document.getElementById('zoom-in').addEventListener('click', function() {
    viewer.setHfov(viewer.getHfov() - 10);
});
document.getElementById('zoom-out').addEventListener('click', function() {
    viewer.setHfov(viewer.getHfov() + 10);
});
document.getElementById('fullscreen').addEventListener('click', function() {
    viewer.toggleFullscreen();
});

/*操作栏事件绑定*/
parent.document.getElementById("add").addEventListener('click',function() {
    document.addEventListener("click",addHots);
});
parent.document.getElementById("delete").addEventListener('click',removeHot);

var count = 0;
parent.document.getElementById("wander").addEventListener('click',function() {
    if(count++ % 2 == 0) {
        viewer.startAutoRotate(5);
    }else {
        viewer.stopAutoRotate();
    }
});
parent.document.getElementById('move').addEventListener('click',function () {
    viewer.setIsLoad(false);
    moveHotSpot();
});



