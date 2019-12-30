var t = Object.assign || function(t) {
    for (var o = 1; o < arguments.length; o++) {
        var n = arguments[o];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, o = require("../../../../npm/@dp/sparrow/index.js"), n = require("../../../../public/request"), a = require("../../../../public/nav"), e = getApp(), i = {
    host: "https://m.dianping.com",
    api: {
        maitonInfo: "/hui/mm/wxapoi"
    },
    token: "product" === o.env.get() ? "IEB2ZLWJPFXRH9SZY8ERTA" : "ODIIHPAWIMRUX1BCHVOSLW"
};

Component({
    properties: {
        shopOptions: {
            type: Object,
            observer: "onPropertyChange"
        },
        moduleConfig: {
            type: Object
        },
        shopId: {
            type: String,
            observer: "onPropertyChange"
        },
        cityId: {
            type: Number,
            observer: "onPropertyChange"
        },
        lxData: {
            type: Object
        }
    },
    data: {
        show: !1,
        maitonInfo: null
    },
    methods: {
        onPropertyChange: function() {
            var t = this, o = this.data.shopId || "", a = "";
            this.data.shopOptions && (o = this.data.shopOptions.shopId || "", a = this.data.shopOptions.shopUuid || ""), 
            (o || a) && (this.url = "/packages/msdeal/pages/maiton-order/maiton-order?poiId=" + (o || "") + "&shopUuid=" + (a || ""), 
            e.init([ {
                name: "token",
                level: 2
            } ]).then(function(t) {
                return t.data.token || "";
            }).then(function(t) {
                return n({
                    url: i.host + i.api.maitonInfo,
                    method: "GET",
                    data: {
                        token: t,
                        shopId: o,
                        shopUuid: a
                    }
                }).then(function(t) {
                    return 200 === t.statusCode ? t.data : "";
                });
            }).then(function(o) {
                if (o && 0 === o.code) {
                    var n = o.data;
                    t.setData({
                        gotoApp: t.data.moduleConfig && t.data.moduleConfig.gotoApp,
                        maitonInfo: n,
                        show: n.huiAvailable || !1
                    });
                }
            }));
        },
        openContactCard: function(n) {
            try {
                n = JSON.parse(n);
                var a = this.data.shopOptions, e = a.shopId, s = a.shopUuid;
                n.showPop = this.data.showTips, this.setData({
                    cardData: t({}, n, {
                        cardData: {
                            ulink: "https://evt.dianping.com/synthesislink/5522141.html",
                            params: {
                                shopuuid: s,
                                shopid: e,
                                sourceType: 5,
                                token: i.token,
                                prizeType: 2
                            },
                            ulinkTitle: "点我下载/打开大众点评APP",
                            ulinkDesc: "用大众点评APP买单，最高再减15元！"
                        }
                    })
                }), o.lxmina.moduleClick("b_dianping_nova_urcvbn7l_mc", this.data.lxData);
            } catch (t) {
                console.error(t);
            }
        },
        goMaiton: function() {
            var t = this, n = this.data.moduleConfig || {}, i = n.gotoApp, s = n.maiData;
            i && s && this.data.showTips ? e.getUserInfo().then(function(n) {
                500 !== n.code ? t.openContactCard(s) : o.login.ensure().then(function(o) {
                    o && o.token && t.openContactCard(s);
                });
            }).catch(function(t) {
                return console.error(t);
            }) : a({
                url: this.url
            });
        },
        showPop: function(t) {
            var n = t.detail || {}, e = n.showPop, i = n.gotoMina;
            console.log("展示tips", e), this.setData({
                showTips: e,
                tipImage: this.data.moduleConfig.tipImage
            }), e && !i && o.lxmina.moduleView("b_dianping_nova_urcvbn7l_mv", this.data.lxData), 
            i && a({
                url: this.url
            });
        }
    }
});