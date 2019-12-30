var e = require("../../../../npm/@dp/sparrow/index.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js")), o = {
    moduleMVid: "b_z5dp9z8i",
    moduleTitleMCbid: "b_r7tqnxav"
}, a = {
    SHOP_FEED: "/wxmapi/follow/shopfeed"
};

Component({
    behaviors: [],
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    data: {},
    methods: {
        _shopOptionsChange: function(i) {
            var n = this;
            if (i) {
                var d = i.shopId, l = i.shopUuid, r = {};
                l ? r.shopUuid = l : r.shopId = d, e.login.getDPUser().then(function(i) {
                    var d = i && i.userId;
                    d && (r.userId = d, e.request.mina({
                        url: n.getDomain() + a.SHOP_FEED,
                        data: r
                    }).then(function(a) {
                        if (a && a.data && 200 == a.data.code) {
                            var i = a.data, l = i.feedList, r = i.title, s = i.count, u = i.url, p = i.showBottom;
                            if (l && l.length) {
                                var h = {
                                    threeLine: "three-line",
                                    personalSwitch: !0
                                };
                                h.personalSwitch = a.data.config && a.data.config.personalSwitch, n.setData({
                                    config: h,
                                    showBottom: p,
                                    url: u,
                                    userId: d,
                                    feedList: l,
                                    title: r,
                                    count: s,
                                    lxData: Object.assign({}, n.data.lxData || {}, {
                                        from: "friendscome"
                                    }),
                                    showModule: !0
                                }), e.lxmina.moduleView(o.moduleMVid, n.data.lxData);
                            } else t.default.log("shop friends come res: " + (a && a.data));
                        } else t.default.log("shop friends come res: " + (a && a.data));
                    }).catch(function(e) {
                        t.default.log("shop friends come error: " + e);
                    }));
                });
            }
        },
        allFeedTap: function() {
            e.lxmina.moduleClick(o.moduleTitleMCbid, this.data.lxData);
            var t = this.data.url;
            t && e.navigation.navigateTo({
                url: t
            });
        },
        handleHorizontalScroll: function() {
            this.triggerEvent("horizontalscroll");
        },
        handleFindLazyLoadComponents: function() {
            this.triggerEvent("lazyload");
        },
        getDomain: function() {
            var t = "https://m.dianping.com";
            return "test" === e.env.get() && (t = "https://m.51ping.com"), t;
        }
    }
});