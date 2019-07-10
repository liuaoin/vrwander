window.onload = function() {
    var lists = document.getElementsByClassName('lists')[0];
    var list = document.getElementsByClassName('list');
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
    var images = [];
    var texts = [];
    var basePath = '../images/school/thumb/';
    init();
    initCarousel();
    function initCarousel() {
        var scenes = param.scenes;
        for(var i in scenes) {
            for(var j in scenes[i]) {
                if(j == 'panorama') {
                    var image = scenes[i][j].split('/')
                    images.push(image[image.length - 1]);
                }
                if(j == 'name') {
                    texts.push(scenes[i][j]);
                }
            }
        }
        for(var i = 0; i < 6; i++) {
            var img = document.createElement('img');
            img.src = basePath + images[i];
            var span = document.createElement('span');
            span.innerText = texts[i];
            span.classList.add('texts');
            list[i].appendChild(img);
            list[i].appendChild(span);
        }
        for(var i in param.scenes) {
            var $option = $("<option>" + param.scenes[i].name + "</option>");
            $('#sceneName').append($option);
        }
    }

    prev.onclick = function () {
        for(var i in list) {
            if(list[i].style.display != 'none') {
                var strs = list[i].childNodes[0].src.split('/');
                var image = strs[strs.length-1];
                lists.removeChild(list[Number(i)+5]);
                var li = document.createElement('li');
                var img = document.createElement('img');
                var index = indexPrev(image);
                img.src = basePath + images[index];
                var span = document.createElement('span');
                span.innerHTML = texts[index];
                span.classList.add('texts');
                li.appendChild(img);
                li.appendChild(span);
                li.classList.add('list');
                lists.insertBefore(li,lists.childNodes[0]);
                break;
            }
        }
    }

    next.onclick = function () {
        for(var i in list) {
            if(list[i].style.display != 'none') {
                var strs = list[i].childNodes[0].src.split('/');
                var image = strs[strs.length-1];
                lists.removeChild(list[i]);
                var li = document.createElement('li');
                var img = document.createElement('img');
                var index = indexNext(image)
                img.src = basePath + images[index];
                var span = document.createElement('span');
                span.innerText = texts[index];
                span.classList.add('texts');
                li.appendChild(img);
                li.appendChild(span);
                li.classList.add('list');
                lists.appendChild(li);
                break;
            }
        }
    }

    function indexPrev(param) {
        for(var i in images) {
            if(images[i] == param) {
                if(Number(i) == 0) {
                    return images.length - 1;
                }else {
                    return Number(i) - 1;
                }
            }
        }
    }

    function indexNext(param) {
        for(var i in images) {
            if(images[i] == param) {
                if(Number(i) + 6 >= images.length) {
                    return Number(i) + 6 - images.length;
                }else {
                    return Number(i) + 6;
                }
            }
        }
    }


    var config = {
        firstScene: "",
        showControls: false,
        autoLoad: true
    };
    config.firstScene = param.default.firstScene;
    param.default = config;
    for(var scene in param.scenes) {
        scene.hotSpots = null;
    }
    var view = pannellum.viewer('container',param);
    $('.box').on('click','li',function() {
        var text = $(this).children('span').text();
        $('#sceneName').val(text);
        var str = $(this).children('img').attr('src').split('/');
        var basePath = '../images/school/'
        var panorama = basePath + str[str.length - 1];
        $.ajax({
            type: 'post',
            url: '/vrwander/scene/findScene',
            dataType: 'json',
            data: {
                panorama: panorama
            },
            success: function (result) {
                var obj = result.obj;
                view.loadScene(obj.sceneId, obj.pitch, obj.yaw, obj.hfov);
            }
        })
    });

    $('#container').click(function (event) {
        var coords = view.mouseEventToCoords(event);
        $('#yaw').val(coords[1]);
        $('#pitch').val(coords[0]);
    });
    
    $('#sceneName').change(function () {
        var sceneName = $('#sceneName').val();
        $.ajax({
            type: 'post',
            url: '/vrwander/scene/findSceneByName',
            dataType: 'json',
            data: {
                name: sceneName
            },
            success: function (result) {
                var scene = result.obj;
                view.loadScene(scene.sceneId,scene.pitch,scene.yaw,scene.hfov);
            }
        })
    })

}