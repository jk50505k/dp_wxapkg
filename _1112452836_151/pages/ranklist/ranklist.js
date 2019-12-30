function t(t, i, e) {
    return i in t ? Object.defineProperty(t, i, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = e, t;
}

var i = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    }
    return t;
}, e = require("../../npm/@dp/sparrow/index.js"), a = require("../../config/index"), n = require("../../components/mina_lazyload_img/index.js").initInComponent, s = require("../../common/tabbar"), o = {
    getNearShop: "/wx-business/dpwx-ranklist/getNearShop",
    getCityShop: "/wx-business/dpwx-ranklist/getCityShop",
    getFoodRank: "/wx-business/dpwx-ranklist/getFoodRank",
    getAppkit: "/astro-plat/appkitClient/queryEleConfigs",
    getChosenRank: "/wx-business/dpwx-ranklist/getChosenRank"
}, r = {
    pageCid: "c_dianping_nova_zhaohaodian",
    shopMVBid: "b_dianping_nova_jwmpxq6v_mv",
    tabBtnMCBid: "b_dianping_nova_f8hvnptc_mc",
    tagBtnMCBid: "b_dianping_nova_hydxrchy_mc",
    choosenMVBid: "b_dianping_nova_t3w6u7z1_mv",
    defaultMVBid: "b_dianping_nova_5v15jkob_mv",
    popMVBid: "b_dianping_nova_qk0oko9r_mv",
    blackPerlMVBid: "b_dianping_nova_7094xoum_mv",
    mustEatMVBid: "b_dianping_nova_dobk2u9x_mv",
    shopModuleMVBid: "b_dianping_nova_5ds9fi8a_mv",
    shopModuleMCBid: "b_dianping_nova_5ds9fi8a_mc",
    shareMCBid: "b_dianping_nova_xxus476z_mc"
}, d = {
    default: "//p0.meituan.net/dpgroup/a8049136aacacd4e859e66f08fa53e3116467.png",
    10: {
        popscore: {
            imgurl: "//p0.meituan.net/dpgroup/127fb81053f3bb558e8e67da4a8a6c9f16200.png",
            subtitle: "全城火热"
        },
        score: {
            imgurl: "//p0.meituan.net/dpgroup/8b372289b594783e2706889424d795f914526.png",
            subtitle: "吃货都爱"
        },
        score1: {
            imgurl: "//p0.meituan.net/dpgroup/ea3c0d65ac88067b76058f09c855e7f013380.png",
            subtitle: "舌尖盛宴"
        }
    }
}, l = {
    distance: 1,
    score1: 4,
    popscore: 2
}, h = {}, c = {}, u = {};

Page({
    data: {
        scrollViewHeight: 667,
        isFixed: !1,
        shopPicStyle: "width: 190rpx;height: 190rpx;border-radius: 6rpx;box-sizing: border-box;",
        tabList: [ "附近上榜", "全城上榜" ],
        isLocal: !0,
        currentIndex: 0,
        currentTagIndex: 0,
        isEmpty: !1,
        render_isEnd: !1,
        render_isLoading: !1,
        nearbyObj: {
            10: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20
            },
            30: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20
            },
            20: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20
            },
            35: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20
            },
            60: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20
            }
        },
        allCityObj: {
            10: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20,
                sort: ""
            },
            30: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20,
                sort: ""
            },
            20: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20,
                sort: ""
            },
            35: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20,
                sort: ""
            },
            60: {
                total: 0,
                list: [],
                isEnd: !1,
                isLoading: !1,
                start: 0,
                limit: 20,
                sort: ""
            }
        },
        tagList: [ {
            tagName: "美食",
            tagId: 10
        }, {
            tagName: "休闲娱乐",
            tagId: 30
        }, {
            tagName: "商场",
            tagId: 20
        }, {
            tagName: "景点",
            tagId: 35
        }, {
            tagName: "酒店",
            tagId: 60
        } ],
        foodRankList: [],
        hasFoodRank: !1,
        inited: !1,
        hasChoosenRank: !1
    },
    onLoad: function() {
        var t = this;
        this.threshold = 688, this.hasChangeCity = !1;
        try {
            var i = this;
            wx.getSystemInfo({
                success: function(t) {
                    var e = t.windowWidth, a = t.windowHeight;
                    i.windowHeight = a, i.ratio = e / 750;
                }
            });
        } catch (t) {}
        e.event.on("cityChange", function(i) {
            console.log("=====> cityChange");
            var e = i && i.cityId, a = i && i.cityName;
            e && t.cityId != e && (t.hasChangeCity = !0, t.cityId = e, t.cityName = a, t.stateInit(), 
            t.pageInit());
        }), this.pageInit(), s(this.route);
    },
    onShow: function() {
        var t = this;
        this.startTime = +new Date(), e.lxmina.pageView(r.pageCid), n(this), this.hasChangeCity ? (this.data.inited && this.data.hasFoodRank ? this.foodRankLxView() : setTimeout(function() {
            t.data.inited && t.data.hasFoodRank && t.foodRankLxView();
        }, 1e3), this.data.hasChoosenRank ? this.choosenRankLxView() : setTimeout(function() {
            t.data.hasChoosenRank && t.choosenRankLxView();
        }, 1e3), this.data.isEmpty ? setTimeout(function() {
            t.data.isEmpty || t.shopModuleLxView();
        }, 1e3) : this.shopModuleLxView()) : this.lxview();
    },
    onHide: function() {
        e.lxmina.pageDisappear({
            duration: +new Date() - this.startTime
        });
    },
    onPullDownRefresh: function() {
        !this.data.hasFoodRank && this.data.inited || (this.stateInit(), this.initGeo(), 
        this.initChoosenRankConfig(), Promise.all([ this.initFoodRank(), this.initChoosenRank(), this.getCurrentList() ]).then(function() {
            wx.stopPullDownRefresh();
        }, function() {
            wx.stopPullDownRefresh();
        }).catch(function(t) {
            wx.stopPullDownRefresh(), console.log(t, "===== onPullDownRefresh fail");
        }));
    },
    onShareAppMessage: function() {
        return e.lxmina.moduleClick(r.shareMCBid), {
            title: "「" + this.cityName + "」好店都在这，快来看看吧",
            path: "/pages/ranklist/ranklist"
        };
    },
    onReachBottom: function() {
        this.getCurrentList();
    },
    onPageScroll: function(t) {
        var i = t.scrollTop;
        this.scrollTop = i;
        var e = this.threshold || 688;
        i >= (e *= this.ratio || .5) && !this.data.isFixed ? this.setData({
            isFixed: !0
        }) : i < e && this.data.isFixed && this.setData({
            isFixed: !1
        }), this.lxview();
    },
    foodRankLxView: function() {
        this.selectComponent("#foodCard").initlxviewIds(), this.selectComponent("#foodCard").lxview();
    },
    choosenRankLxView: function() {
        var t = this;
        e.lxmina.moduleView(r.choosenMVBid, {
            city_id: this.cityId || 1
        }), this.data.goodRankList.forEach(function(i) {
            var e = i.rankType;
            t.choosenModuleLX(e);
        });
    },
    shopModuleLxView: function() {
        e.lxmina.moduleView(r.shopModuleMVBid), this.lxview();
    },
    lxviewinit: function() {
        this.timer = null, this.citytimer = null, this.querySelector = null, this.querySelectorCity = null, 
        this.querySelectorCityNew = null, this.nearbyRects = [], this.allCityRects = [], 
        this.lxViewShopId = [], this.lxViewCityShopId = [];
    },
    lxview: function() {
        0 == this.data.currentIndex && this.data.isLocal ? this.rankShopView() : this.rankCityShopView();
    },
    choosenModuleLX: function(t) {
        var i = {
            city_id: this.cityId
        };
        3 == t ? e.lxmina.moduleView(r.mustEatMVBid, i) : 6 == t ? e.lxmina.moduleView(r.popMVBid, i) : 8 == t ? e.lxmina.moduleView(r.blackPerlMVBid, i) : e.lxmina.moduleView(r.defaultMVBid, i);
    },
    pageInit: function() {
        var t = this;
        this.lxviewinit(), this.initGeo(), this.initChoosenRankConfig(), this.initFoodRank(), 
        this.initChoosenRank(), this.getCurrentList().then(function() {
            t.hasChangeCity || t.shopModuleLxView();
        });
    },
    initGeo: function() {
        var t = e.geo.getCitySync();
        this.cityId = this.cityId || t.cityId || 1, this.cityName = this.cityName || t.cityName || "上海";
        var i = e.geo.getLocationSync();
        this.lat = i.latitude, this.lng = i.longitude, this.locCityId = e.geo.getLocCitySync().cityId;
        var a = this.cityId == this.locCityId;
        this.setData({
            isLocal: a
        });
    },
    initChoosenRankConfig: function() {
        c = {
            rankName: "人气菜品榜",
            rankUrl: a.DOMAIN + "/dishes/hot?msource=wxranklist&cityId=" + this.cityId,
            rankType: "default"
        }, u = {
            3: {
                imgUrl: "//p0.meituan.net/dpgroup/984b07e8cd86565230fb5a1296b9f32311399.png",
                titleUrl: "//p0.meituan.net/dpgroup/8523b6508581e644fca71554f462a28a2846.png",
                rankUrl: a.DOMAIN + "/musteat2019/index?cityid=" + this.cityId + "&utm_source=zhd_miniapp"
            },
            6: {
                imgUrl: "//p0.meituan.net/dpgroup/4cdf378ce04b71d1dacf82434fafd07437658.png",
                titleUrl: "//p0.meituan.net/dpgroup/e80a1a1530351d96d1c9937d197340441878.png",
                rankUrl: a.DOMAIN + "/city-billboard/hottest?cityId=" + this.cityId + "&latitude=" + this.lat + "&longitude=" + this.lng + "&notitlebar=1&noquery=1&wkwebview=1&utm_source=zhd_miniapp"
            },
            8: {
                imgUrl: "//p0.meituan.net/dpgroup/01148521a633424a879a8a3b802ea42c38565.png",
                titleUrl: "//p0.meituan.net/dpgroup/e66d0392fdc325a1e62fd0419f1612b32828.png",
                rankUrl: a.DOMAIN + "/blackpearl2020/2019/index.html?cityId=" + this.cityId + "&utm_source=zhd_miniapp"
            },
            default: {
                imgUrl: "//p0.meituan.net/dpgroup/7dfc9606300dfaeb01340ec0a5a0ffde39309.png",
                titleUrl: "//p1.meituan.net/dpgroup/15b5cf1f0e05a5c676ea88640e425e913602.png",
                rankUrl: a.DOMAIN + "/dishes/hot?msource=wxranklist&cityId=" + this.cityId + "&utm_source=zhd_miniapp"
            }
        };
    },
    initFoodRank: function() {
        var t = this;
        return Promise.all([ this.getAppkit(), this.getFoodRank() ]).then(function(e) {
            if (e && e.length) {
                var a = e[0] || [], n = e[1] || [];
                a.forEach(function(t) {
                    var i = t.cateId;
                    h[i] = t;
                });
                var s = [];
                n && n.length && (t.setData({
                    hasFoodRank: !0
                }), s = n.map(function(t) {
                    var e = t.categoryId, a = t.sort;
                    if (10 == e) {
                        var n = d[e], s = n[a].imgurl || "https://p0.meituan.net/dpgroup/a8049136aacacd4e859e66f08fa53e3116467.png", o = n[a].subtitle || "";
                        t.imgUrl = s, t.subtitle = o;
                    } else t = i({}, t, {
                        imgUrl: h && h[e] && h[e].image || "",
                        subtitle: h && h[e] && h[e].subtitle || ""
                    });
                    return t;
                }), t.setData({
                    foodRankList: s
                }));
            }
            if (t.setData({
                inited: !0
            }), !t.hasChangeCity && t.data.hasFoodRank) return t.foodRankLxView(), Promise.resolve();
        }).catch(function(i) {
            return console.log(i, "====== initFoodRank fail"), t.setData({
                inited: !0
            }), Promise.resolve();
        });
    },
    initChoosenRank: function() {
        var t = this;
        return e.request.custom({
            url: a.DOMAIN + o.getChosenRank,
            data: {
                cityId: this.cityId
            }
        }).then(function(i) {
            if (i && i.data && 200 == i.data.code) {
                var e = i.data.data;
                e && e.length <= 1 && e.push(c);
                var a = !1, n = e.map(function(t) {
                    var i = t.rankType;
                    3 == i && (a = !0);
                    var e = u[i] || u.default;
                    return t.imgUrl = e.imgUrl, t.titleUrl = e.titleUrl, t;
                });
                if (t.setData({
                    hasChoosenRank: a,
                    goodRankList: n
                }), n.length < 3 && t.data.hasChoosenRank ? t.threshold = t.threshold - 80 : t.data.hasChoosenRank || (t.threshold = t.threshold - 354 - 20), 
                t.hasChangeCity) return;
                t.choosenRankLxView();
            } else t.threshold = t.threshold - 354 - 20;
            return Promise.resolve();
        }).catch(function(i) {
            return console.log(i, "===== err"), t.setData({
                hasChoosenRank: !1
            }), t.threshold = t.threshold - 354 - 20, Promise.resolve();
        });
    },
    stateInit: function() {
        this.threshold = 688, this.setData({
            render_isLoading: !1,
            render_isEnd: !1,
            hasFoodRank: !1,
            inited: !1,
            isEmpty: !1,
            currentIndex: 0,
            currentTagIndex: 0,
            nearbyObj: {
                10: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                30: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                20: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                35: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                60: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                }
            },
            allCityObj: {
                10: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                30: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                20: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                35: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                },
                60: {
                    total: 0,
                    list: [],
                    isEnd: !1,
                    isLoading: !1,
                    start: 0,
                    limit: 20,
                    sort: ""
                }
            }
        });
    },
    getAppkit: function() {
        return e.request.custom({
            url: a.DOMAIN + o.getAppkit,
            data: {
                sceneKey: "miniapp_ranklist_image"
            }
        }).then(function(t) {
            var i = null;
            if (t && t.data && 200 == t.data.code) {
                var e = t.data.data || {};
                i = e && e.result || [];
            }
            return Promise.resolve(i);
        });
    },
    getFoodRank: function() {
        return e.request.custom({
            url: a.DOMAIN + o.getFoodRank,
            data: {
                cityId: this.cityId
            }
        }).then(function(t) {
            var i = null;
            if (t && t.data && 200 == t.data.code) return i = t.data.data || [], Promise.resolve(i);
        }).catch(function(t) {
            return console.log("******** getFoodRank fail"), Promise.reject(t);
        });
    },
    getCurrentList: function(t) {
        var e = this, a = this.data.tagList[this.data.currentTagIndex].tagId;
        if (this.data.isLocal) {
            var s = 0 == this.data.currentIndex ? this.data.nearbyObj[a].start : this.data.allCityObj[a].start, o = (0 == this.data.currentIndex ? this.data.nearbyObj[a].limit : this.data.allCityObj[a].limit) || 20, r = 0 == this.data.currentIndex ? this.data.nearbyObj[a].list : this.data.allCityObj[a].list;
            if (r && r.length && "click" == t) return n(this), Promise.resolve();
            var d = {
                cityId: this.cityId,
                shopType: a,
                lng: this.lng,
                lat: this.lat,
                start: s,
                limit: o
            };
            return 20 == a && (d = i({}, d, {
                categoryId: 119
            })), 0 == this.data.currentIndex && (d = i({}, d, {
                sortType: 1
            })), 1 == this.data.currentIndex && (d = i({}, d, {
                sortType: 10 == a ? l.score1 : l.popscore
            })), 0 == this.data.currentIndex ? new Promise(function(t) {
                e.getNearShopList(d, a).then(function() {
                    return t();
                }, function() {
                    return t();
                }).catch(function() {
                    return t();
                });
            }) : new Promise(function(t) {
                e.getCityShopList(d, a).then(function() {
                    return t();
                }, function() {
                    return t();
                }).catch(function() {
                    return t();
                });
            });
        }
        var h = this.data.allCityObj[a].start, c = this.data.allCityObj[a].limit || 20, u = this.data.allCityObj[a].list;
        if (!u || !u.length || "click" != t) {
            var p = 10 == a ? l.score1 : l.popscore, g = {
                cityId: this.cityId,
                shopType: a,
                lng: this.lng,
                lat: this.lat,
                start: h,
                limit: c,
                sortType: p
            };
            return 20 == a && (g = i({}, g, {
                categoryId: 119
            })), new Promise(function(t) {
                e.getCityShopList(g, a).then(function() {
                    return t();
                }, function() {
                    return t();
                }).catch(function() {
                    return t();
                });
            });
        }
        n(this);
    },
    getNearShopList: function(s, r) {
        var d = this, l = this.data.nearbyObj[r], h = l.isLoading, c = l.isEnd, u = l.total, p = l.list, g = l.start, m = l.limit;
        if (h) return console.log("正在加载中...."), Promise.resolve();
        if (c) return console.log(p, "已经加载全部...."), p && 0 == p.length && this.setData({
            isEmpty: !0
        }), this.setData({
            render_isEnd: !0
        }), Promise.resolve();
        this.setData({
            render_isEnd: !1,
            render_isLoading: !0
        });
        var f = "nearbyObj." + r + ".isLoading";
        return this.setData(t({}, f, !0)), e.request.custom({
            url: a.DOMAIN + o.getNearShop,
            data: s
        }).then(function(e) {
            if (d.setData(t({}, f, !1)), e && e.data && 200 == e.data.code) {
                var a, s = e.data.data, o = s.total, l = s.shopList || [], h = s.shopBrandMap || {};
                if (h) {
                    for (var c in h) !function(t) {
                        var i = [];
                        (h[t] || []).forEach(function(t) {
                            10 == t.shopType || 20 == t.shopType || 30 == t.shopType ? (t.rankName || t.shopRank) && i.push(t) : i.push(t);
                        }), h[t] = i;
                    }(c);
                }
                var y = [];
                l.forEach(function(t) {
                    var i = t.brandId, e = t.shopType, a = h[i] || [], n = t.rankName || t.shopRank, s = 10 == e || 20 == e || 30 == e;
                    a && a.length && (t.brandShop = a), n && s ? y.push(t) : s || y.push(t);
                });
                var v = p && p.length ? u : o, b = p.concat(y);
                b && 0 == b.length && d.setData({
                    isEmpty: !0
                }), g + m >= v && d.setData({
                    render_isEnd: !0
                }), f = "nearbyObj." + r, d.setData((a = {}, t(a, f, i({}, d.data.nearbyObj[r], {
                    total: v,
                    list: b,
                    isEnd: g + m >= v,
                    start: g + m
                })), t(a, "render_isLoading", !1), a), function() {
                    n(d);
                });
            } else {
                var x;
                d.setData((x = {}, t(x, "nearbyObj." + r + ".isLoading", !1), t(x, "nearbyObj." + r + ".isEnd", !0), 
                t(x, "render_isEnd", !0), t(x, "render_isLoading", !1), x)), p && 0 == p.length && d.setData({
                    isEmpty: !0
                });
            }
            return Promise.resolve();
        }).catch(function(i) {
            var e;
            return console.log("========> getNearShopList error", i), d.setData((e = {}, t(e, "nearbyObj." + r + ".isLoading", !1), 
            t(e, "nearbyObj." + r + ".isEnd", !0), t(e, "render_isEnd", !0), t(e, "render_isLoading", !1), 
            e)), p && 0 == p.length && d.setData({
                isEmpty: !0
            }), Promise.resolve();
        });
    },
    getCityShopList: function(s, r) {
        var d = this, l = this.data.allCityObj[r], h = l.isLoading, c = l.isEnd, u = l.total, p = l.list, g = l.start, m = l.limit;
        if (h) return console.log("正在加载中...."), Promise.resolve();
        if (c) return console.log(p, "已经加载全部...."), p && 0 == p.length && this.setData({
            isEmpty: !0
        }), this.setData({
            render_isEnd: !0
        }), Promise.resolve();
        this.setData({
            render_isEnd: !1,
            render_isLoading: !0
        });
        var f = "allCityObj." + r + ".isLoading";
        return this.setData(t({}, f, !0)), e.request.custom({
            url: a.DOMAIN + o.getCityShop,
            data: s
        }).then(function(e) {
            if (d.setData(t({}, f, !1)), e && e.data && 200 == e.data.code) {
                var a, s = e.data.data, o = s.total, l = s.shopList || [], h = s.shopBrandMap || {};
                if (h) {
                    for (var c in h) !function(t) {
                        var i = [];
                        (h[t] || []).forEach(function(t) {
                            10 == t.shopType || 20 == t.shopType || 30 == t.shopType ? (t.rankName || t.shopRank) && i.push(t) : i.push(t);
                        }), h[t] = i;
                    }(c);
                }
                var y = [];
                l.forEach(function(t) {
                    var i = t.shopType, e = t.brandId, a = h[e] || [], n = 10 == i || 20 == i || 30 == i, s = t.rankName || t.shopRank;
                    a && a.length && (t.brandShop = a), s && n ? y.push(t) : n || y.push(t);
                });
                var v = p && p.length ? u : o, b = p.concat(y), x = g + m >= v;
                b && 0 == b.length && d.setData({
                    isEmpty: !0
                }), x && d.setData({
                    render_isEnd: !0
                }), f = "allCityObj." + r, d.setData((a = {}, t(a, f, i({}, d.data.allCityObj[r], {
                    total: v,
                    list: b,
                    isEnd: x,
                    start: g + m
                })), t(a, "render_isLoading", !1), a), function() {
                    n(d);
                });
            } else {
                var C;
                d.setData((C = {}, t(C, "allCityObj." + r + ".isLoading", !1), t(C, "allCityObj." + r + ".isEnd", !0), 
                t(C, "render_isLoading", !1), t(C, "render_isEnd", !0), C)), p && 0 == p.length && d.setData({
                    isEmpty: !0
                });
            }
            return Promise.resolve();
        }).catch(function(i) {
            var e;
            return console.log("========> getCityShopList error", i), d.setData((e = {}, t(e, "allCityObj." + r + ".isLoading", !1), 
            t(e, "allCityObj." + r + ".isEnd", !0), t(e, "render_isLoading", !1), t(e, "render_isEnd", !0), 
            e)), p && 0 == p.length && d.setData({
                isEmpty: !0
            }), Promise.resolve();
        });
    },
    goIndex: function() {
        e.navigation.redirectTo({
            url: "/pages/index/index"
        });
    },
    changeCurrentIndex: function(t) {
        var i = this, a = t.currentTarget.id;
        e.lxmina.moduleClick(r.shopModuleMCBid), e.lxmina.moduleClick(r.tabBtnMCBid, {
            index: a
        }), a != this.data.currentIndex && (this.setData({
            currentIndex: t.currentTarget.id || 0,
            isEmpty: !1,
            render_isEnd: !1
        }), this.getCurrentList("click").then(function() {
            i.lxview();
        }));
    },
    changeTag: function(t) {
        var i = this, a = t.currentTarget.dataset.tagIndex;
        e.lxmina.moduleClick(r.shopModuleMCBid), e.lxmina.moduleClick(r.tagBtnMCBid, {
            index: a
        }), a != this.data.currentTagIndex && (this.setData({
            currentTagIndex: a,
            isEmpty: !1,
            render_isEnd: !1
        }), this.getCurrentList("click").then(function() {
            i.lxview();
        }));
    },
    rankShopView: function() {
        var t = this;
        this.timer && clearTimeout(), this.timer = setTimeout(function() {
            clearTimeout(t.timer), t.querySelector && 0 != t.nearbyRects.length || (t.querySelector = wx.createSelectorQuery().selectAll(".shop-card-wrap-active >>> .shop-card >>> .shoplist-item").boundingClientRect(function(i) {
                t.nearbyRects = i, t.shopsView(i, r.shopMVBid, "near"), t.timer = null;
            })), t.querySelector.exec();
        }, 1e3);
    },
    rankCityShopView: function() {
        var t = this;
        this.citytimer && clearTimeout(), this.citytimer = setTimeout(function() {
            clearTimeout(t.citytimer), t.querySelectorCityNew && 0 != t.allCityRects.length || (t.querySelectorCityNew = wx.createSelectorQuery().selectAll(".shop-card-wrap-city-active >>> .shop-card >>> .shoplist-item").boundingClientRect(function(i) {
                t.allCityRects = i, t.shopsView(i, r.shopMVBid, "city"), t.citytimer = null;
            })), t.querySelectorCityNew.exec();
        }, 1e3);
    },
    shopsView: function(t, i, a) {
        if (t && i && 0 != t.length) for (var n = 0; n < t.length; n++) {
            var s = t[n], o = s.id, d = s.top;
            if ("near" == a) {
                if (this.lxViewShopId.indexOf(o) > -1) continue;
            } else if (this.lxViewCityShopId.indexOf(o) > -1) continue;
            if (!(d < this.windowHeight)) break;
            "near" == a ? this.lxViewShopId.push(o) : this.lxViewCityShopId.push(o), e.lxmina.moduleView(r.shopMVBid, {
                poi_id: o,
                category_id: this.data.tagList[this.data.currentTagIndex].tagId || 10
            });
        }
    }
});