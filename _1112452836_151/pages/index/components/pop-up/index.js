var t = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), n = require("../../../../config/index"), a = require("../../common/checkopenid"), o = getApp();

Component({
    properties: {
        options: {
            type: Object,
            value: null,
            observer: "optionsChange"
        },
        hasTip: {
            type: Boolean,
            value: !1
        },
        isSupportMiniPro: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        ad: null
    },
    methods: {
        optionsChange: function(t, e) {
            t && t.city ? this.fetchData(t) : this.setData({
                ad: null
            });
        },
        fetchData: function() {
            var i = this, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!s.pullDown) {
                var l = o.getShowOptions() && o.getShowOptions().scene ? parseInt(o.getShowOptions().scene) : null;
                return e.log("IndexPage: 获取城市弹窗信息"), Promise.all([ a(), o.getFigure() ]).then(function(e) {
                    var a = {
                        cityId: s.city.cityId,
                        cx: e[1],
                        scene: l
                    };
                    return e[0] && (a.code = e[0]), t.request.custom({
                        url: n.DOMAIN + n.API.INDEX_POPUP,
                        data: a
                    });
                }).then(function(t) {
                    t && 200 === t.statusCode && 200 === t.data.code && !i.data.hasTip ? i.setData({
                        ad: 1 === t.data.popup.type ? t.data.popup.data : null
                    }) : (i.setData({
                        ad: null
                    }), e.log("IndexPage:无城市弹窗信息===>" + JSON.stringify(t.data)));
                }).catch(function(t) {
                    i.setData({
                        ad: null
                    }), e.log("Index Popup Fail:" + JSON.stringify(t));
                });
            }
        },
        onScroll: function(t) {
            this.triggerEvent("noscroll");
        },
        onClose: function() {
            this.triggerEvent("close");
        }
    }
});