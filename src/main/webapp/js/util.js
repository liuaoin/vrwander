/*点击iframe时隐藏父页面div*/
var iframeOnClick = {
    resolution : 100,//响应时间
    iframes : [],
    interval: null,
    iframe:function() {
        this.element = arguments[0];
        this.func = arguments[1];
        this.hasTracked = false;
    },
    track:function(element,func) {
        this.iframes.push(new this.iframe(element,func));
        if(!this.interval) {
            var _this = this;
            this.interval = setInterval(function() {
                _this.checkClick();
            },this.resolution)
        }
    },
    checkClick:function() {
        if(document.activeElement) {
            var activeElement = document.activeElement;
            for(var i in this.iframes) {
                if(activeElement === this.iframes[i].element) {
                    if(this.iframes[i].hasTracked == false) {
                        this.iframes[i].func.apply(window,[]);
                        this.iframes[i].hasTracked = true;
                    }
                }else {
                    this.iframes[i].hasTracked = false;
                }
            }
        }
    },
}

var param = {
    default: {
        "author":"Liu Liang",
        "sceneFadeDuration":"2000",
        "autoLoad": true,
        "compass": true,
        "firstScene": "",
        "showControls": false,
        "hotSpotDebug": true,
    },
    scenes: {
    }
};

function init() {
    findDefault();
    findAllScene();
}

function findAllScene() {
    $.ajax({
        type: 'post',
        url: '/vrwander/scene/findAllScene',
        dataType: 'json',
        async: false,
        success: function (data) {
            var obj = data.obj;
            for(var i in obj) {
                for(var j in obj[i]) {
                    if(j == "sceneId") {
                        param.scenes[obj[i][j]] = obj[i];
                    }
                }
            }
        }
    });
}

function findDefault() {
    $.ajax({
        type: 'post',
        url: '/vrwander/initialConfig/findDefault',
        dataType: 'json',
        async: false,
        success: function (data) {
            var obj = data.obj;
            for(var i in obj) {
                if(i == "author") {
                    param.default[i] = obj[i];
                }
                if(i = "title") {
                    param.default[i] = obj[i];
                }
                if(i = "yaw") {
                    param.default[i] = obj[i];
                }
                if(i = "pitch") {
                    param.default[i] = obj[i];
                }
                if(i = "hfov") {
                    param.default[i] = obj[i];
                }
                if(i = "firstScene") {
                    param.default[i] = obj[i];
                }
            }
        }
    });
}

/*    function getRequest() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }*/