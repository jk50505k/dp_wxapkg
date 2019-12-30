var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = require("../../../../npm/@dp/sparrow/index.js");

Component({
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        }
    },
    data: {
        showMe: !1,
        showMore: !1,
        showMoreBtnText: ""
    },
    ready: function() {},
    methods: {
        _shopOptionsChange: function(a) {
            var o = this, n = e.env.get() === e.env.ENV_PRODUCT ? "https://mapi.dianping.com" : "https://mapi.51ping.com";
            e.geo.getCity().then(function(s) {
                var i = {
                    clienttype: "100400",
                    cityid: s.cityId
                };
                a.shopId ? i.poiid = a.shopId : a.shopUuid && (i.shopuuid = a.shopUuid);
                var r = e.login.getTokenSync();
                r && (i.token = r), e.request.mapi({
                    url: n + "/mapi/marketing/times/card/shelf/mini/poicards.json",
                    method: "get",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: i
                }).then(function(e) {
                    if (200 == e.statusCode && e.data) {
                        var a = e.data;
                        o.setData(t({}, a, {
                            showMe: !0
                        })), o.data.cards && o.data.cards.length > 2 && o.setData({
                            showMoreBtnText: "查看其他" + (o.data.cards.length - 2) + "张会员卡"
                        });
                    }
                });
            });
        },
        jump: function(t) {
            e.navigation.navigateTo({
                url: t.currentTarget.dataset.jumpUrl
            });
        },
        hanldeClickShowMore: function() {
            var t = this.data.showMore ? "查看其他" + (this.data.cards.length - 2) + "张会员卡" : "收起";
            this.setData({
                showMore: !this.data.showMore,
                showMoreBtnText: t
            });
        }
    }
});