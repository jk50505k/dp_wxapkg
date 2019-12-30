var t = require("../../npm/@dp/sparrow/index.js"), a = require("../../npm/@dp/logan-wxapp/build/wxlogan.js"), i = require("../../config/index"), o = "APP-DOWNLOAD-COMPONENT", n = getApp(), e = {
    loginPopMVBid: "b_dianping_nova_rdcyt9id_mv",
    loginPopMCBid: "b_dianping_nova_rdcyt9id_mc",
    loginCloseMCBid: "b_dianping_nova_clh399it_mc",
    bigPopMVBid: "b_dianping_nova_7irvyyqd_mv",
    loginLayerMVBid: "b_dianping_nova_22h1348i_mv",
    loginLayerMCBid: "b_dianping_nova_22h1348i_mc"
}, s = {
    APP_DOWNLOAD: "/wxmapi/bonus/download"
};

Component({
    properties: {
        hongBaoData: {
            type: Object,
            observer: "_hongBaoDataChange"
        }
    },
    data: {
        showBottomLogin: !1,
        showLoginPop: !1,
        showBig: !1,
        smallImgUrl: ""
    },
    ready: function() {
        var i = this, o = n.getShowOptions() && n.getShowOptions().scene ? parseInt(n.getShowOptions().scene) : null, s = t.pageUtil.getCurrentPage() && t.pageUtil.getCurrentPage().__route__;
        t.event.on("loginEnd", function(t) {
            t && t.token && (i.fetchConfig(o, s), i.setData({
                showBottomLogin: !1
            }));
        }), t.login.niceToHave().then(function() {
            i.pageRoute = s;
            var a = i.data.hongBaoData || {}, n = a.smallImgUrl, l = a.showBig, g = a.info, r = void 0 === g ? {} : g, d = a.cardData, c = a.popData;
            if (n && c && d) {
                var h = i.data.hongBaoData && i.data.hongBaoData.needPop || i.needPopRedPocket(l);
                console.log(r.type + "红包渲染ready"), i.setData({
                    info: r,
                    showBig: h,
                    popData: c,
                    cardData: JSON.stringify(d),
                    smallImgUrl: n
                }, function() {
                    t.lxmina.moduleView(e.bigPopMVBid, {
                        activity_id: "xrhb"
                    });
                });
            } else i.fetchConfig(o, s);
        }).catch(function(t) {
            i.fetchConfig(o, s), a.log("静默登录失败" + JSON.stringify(t));
        });
    },
    detached: function() {
        console.log("清除转盘抽奖弹窗定时器"), this._stopInterval();
    },
    methods: {
        _hongBaoDataChange: function(t) {
            var a = t || {}, i = a.smallImgUrl, o = a.showBig, n = a.cardData, e = a.popData;
            i && o && n && e && this.setData({
                smallImgUrl: i,
                showBig: o,
                popData: e,
                cardData: JSON.stringify(n)
            });
        },
        fetchConfig: function(n, l) {
            var g = this;
            this.pageRoute = l;
            var r = t.geo.getCitySync();
            t.geo.getLocation().then(function(d) {
                a.log(o + ": 获取引导app下载信息");
                var c = {
                    longitude: d && d.longitude,
                    latitude: d && d.latitude,
                    pageRoute: l,
                    scene: n,
                    cityId: r && r.cityId,
                    activityId: "zpcj"
                };
                return getCurrentPages() && 1 == getCurrentPages().length && (c.isDirect = 1), t.request.mina({
                    url: i.DOMAIN + s.APP_DOWNLOAD,
                    data: c
                }).then(function(i) {
                    if (i && 200 === i.statusCode && 200 === i.data.code && i.data.data) {
                        var n = i && i.data && i.data.data, s = i.data.bonusLxBid || "", l = i.data.isActivity || !1, r = n.info || {};
                        if (n && n.smallImgUrl) {
                            var d = r.style || "";
                            console.log("fetch, " + r.type + "红包渲染ready");
                            var c = {
                                isActivity: l,
                                style: d,
                                info: r,
                                smallImgUrl: n.smallImgUrl,
                                bonusLxBid: s
                            };
                            if (l) {
                                var h = g.needPopActivity();
                                c.bigImgUrl = n.bigImgUrl, c.btnImgUrl = n.btnImgUrl, c.link = n.link, c.showBig = h, 
                                g._startCutDown(n.endTime);
                            } else c.popData = n.popData, c.cardData = JSON.stringify(n.cardData);
                            g.setData(c, function() {
                                s && t.lxmina.moduleView(g.data.showBig ? e.bigPopMVBid : s.mvBid, s.valLab);
                            });
                        } else g.setData({
                            showBig: !1,
                            smallImgUrl: ""
                        }), a.log(o + ":无引导app下载信息===>" + JSON.stringify(i.data));
                    } else g.setData({
                        showBig: !1,
                        smallImgUrl: ""
                    }), a.log(o + ":无引导app下载信息===>" + JSON.stringify(i.data));
                }).catch(function(t) {
                    g.setData({
                        showBig: !1,
                        smallImgUrl: ""
                    }), a.log("获取引导app下载信息err:" + JSON.stringify(t));
                });
            }).catch(function(t) {
                a.log("红包定位失败" + JSON.stringify(t));
            });
        },
        onMiniTap: function() {
            this.setData({
                showBig: !0
            }), this.triggerEvent("noscroll"), this.data.bonusLxBid && this.data.bonusLxBid.mcBid && t.lxmina.moduleClick(this.data.bonusLxBid.mcBid, this.data.bonusLxBid.valLab), 
            t.lxmina.moduleView(e.bigPopMVBid, this.data.bonusLxBid && this.data.bonusLxBid.valLab || {
                activity_id: "xrhb"
            });
        },
        onActivityTap: function() {
            this.data.link && t.navigation.navigateTo({
                url: this.data.link
            }), this.setData({
                showBig: !1
            }), this.triggerEvent("close"), t.lxmina.moduleClick("b_dianping_nova_7irvyyqd_mc", this.data.bonusLxBid && this.data.bonusLxBid.valLab || "");
        },
        needPopRedPocket: function(a) {
            var i = !1;
            if (a) {
                var o = t.cache.getStorageSync("dp_wallet_day");
                if (!o) return this.updateWalletPopDayCache(), !0;
                var n = new Date().getTime();
                (i = this.calcPop(n, o)) && this.updateWalletPopDayCache();
            }
            return i;
        },
        updateWalletPopDayCache: function() {
            var a = Date.now();
            t.cache.setStorage("dp_wallet_day", a), t.cache.setStorage("dp_index_login_day", {
                addTime: a
            });
        },
        onCloseTap: function() {
            this.setData({
                showBig: !1
            }), this.triggerEvent("close"), t.lxmina.moduleClick("b_dianping_nova_y3lf4rqx_mc"), 
            this.data.bonusLxBid && t.lxmina.moduleView(this.data.bonusLxBid.mvBid, this.data.bonusLxBid.valLab);
        },
        handleContact: function() {
            this.setData({
                showBig: !1
            }), console.log("hongbao 携带card信息", this.data.cardData), this.triggerEvent("close"), 
            t.lxmina.moduleClick("b_dianping_nova_7irvyyqd_mc", {
                activity_id: "xrhb"
            });
        },
        calcPop: function(t, a) {
            return parseInt((t - a) / 864e5) - 2 > 0;
        },
        mayLoginPop: function() {
            var a = t.login.getTokenSync(), i = "pages/index/index" == this.pageRoute, o = this.needPopLogin();
            !a && i ? o ? (this.setData({
                showLoginPop: o,
                showBottomLogin: !1
            }), this.triggerEvent("noscroll"), t.cache.setStorage("dp_index_login_day", {
                addTime: Date.now()
            }), t.lxmina.moduleView(e.loginPopMVBid)) : (this.setData({
                showLoginPop: !1,
                showBottomLogin: !0
            }), t.lxmina.moduleView(e.loginLayerMVBid)) : this.setData({
                showLoginPop: !1
            });
        },
        mayLoginTips: function() {
            var a = t.login.getTokenSync(), i = "pages/index/index" == this.pageRoute;
            !a && i ? (this.setData({
                showLoginPop: !1,
                showBottomLogin: !0
            }), t.lxmina.moduleView(e.loginLayerMVBid)) : this.setData({
                showLoginPop: !1,
                showBottomLogin: !1
            });
        },
        needPopLogin: function() {
            var a = !1, i = t.cache.getStorageSync("dp_index_login_day");
            if (i && i.addTime) Math.floor((Date.now() - i.addTime) / 864e5) > 0 && (a = !0); else {
                var o = Date.now();
                t.cache.setStorage("dp_index_login_day", {
                    addTime: o
                }), a = !0;
            }
            return a;
        },
        onLoginClose: function() {
            this.triggerEvent("close"), t.lxmina.moduleClick(e.loginCloseMCBid);
        },
        gotoLogin: function(i) {
            var o = this;
            t.login.ensure().then(function(t) {
                t && t.token ? o.setData({
                    showLoginPop: !1,
                    showBottomLogin: !1
                }) : o.setData({
                    showBottomLogin: !0,
                    showLoginPop: !1
                });
            }).catch(function(t) {
                a.log("强制登录失败" + JSON.stringify(t)), o.setData({
                    showBottomLogin: !0,
                    showLoginPop: !1
                });
            }), this.triggerEvent("close"), "pop" == i.currentTarget.dataset.source ? t.lxmina.moduleClick(e.loginPopMCBid) : t.lxmina.moduleClick(e.loginLayerMCBid);
        },
        needPopActivity: function() {
            var a = !1, i = t.cache.getStorageSync("dp_index_activity_pop_day");
            if (!i) return this.updateActivityPopDayCache(), this.triggerEvent("noscroll"), 
            !0;
            var o = new Date().getTime();
            return (a = this.calcAcPop(o, i)) && (this.updateActivityPopDayCache(), this.triggerEvent("noscroll")), 
            a;
        },
        updateActivityPopDayCache: function() {
            var a = Date.now();
            t.cache.setStorage("dp_index_activity_pop_day", a);
        },
        calcAcPop: function(t, a) {
            return parseInt((t - a) / 864e5) > 0;
        },
        _startCutDown: function(t) {
            var a = Date.now();
            this._stopInterval(), a < t ? (console.log("倒计时模式"), this.startInterval(t)) : this._stopInterval();
        },
        _stopInterval: function() {
            this.lotteryInterVal && (clearInterval(this.lotteryInterVal), this.setData({
                timeData: null
            }), this.lotteryInterVal = null);
        },
        startInterval: function(t) {
            var a = this, i = function() {
                var i = Date.now(), o = Math.floor((t - i) / 1e3);
                a._countDown(o);
            };
            i(), this.lotteryInterVal = setInterval(i, 1e3);
        },
        _countDown: function(t) {
            if (t < 0) return this.setData({
                cutdownData: null
            }), void this._stopInterval();
            var a = parseInt(t / 86400), i = parseInt(t / 3600 - 24 * a), o = parseInt((t - (3600 * a * 24 + 3600 * i)) / 60), n = parseInt(t - (3600 * a * 24 + 3600 * i + 60 * o));
            this.setData({
                cutdownData: {
                    days: "" + a,
                    hours: "" + (i < 10 ? "0" + i : i),
                    mins: "" + (o < 10 ? "0" + o : o),
                    secs: "" + (n < 10 ? "0" + n : n)
                }
            });
        }
    }
});