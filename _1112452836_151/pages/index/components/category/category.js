var t = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), a = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), i = require("../../../../config/index"), n = require("../../common/checkopenid"), o = {
    jgwMVBid: "b_vd6fgnog",
    jgwMCBid: "b_ngvtbo5g"
}, c = [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ], r = [ "dp_categoryList", "dp_wallet_categoryList" ], g = !1, d = !1;

Component({
    properties: {
        options: {
            type: Object,
            value: null,
            observer: "optionsChange"
        },
        isFirstLoad: {
            type: Boolean,
            value: !1
        },
        initFinishTime: {
            type: Number,
            value: null
        }
    },
    data: {
        categoryList: c
    },
    methods: {
        optionsChange: function(t, e) {
            var a = this;
            t && Object.keys(t).length ? (g = !1, this.fetchData(t).then(function(t) {
                t && 500 === t.code && !d && a.triggerEvent("changecatestate", {
                    isError: !0
                });
            })) : this.setData({
                categoryList: c
            });
        },
        fetchData: function(t) {
            var e = t;
            return a.log("获取首页金刚位信息请求参数: " + JSON.stringify(e)), e && e.pullDown || this.getCategoryFromCache(e), 
            this.doFetch(e);
        },
        doFetch: function(o) {
            var c = this, r = Date.now();
            return new Promise(function(d) {
                var s = {
                    cityId: o && o.city && o.city.cityId
                };
                o.channel && (s.channel = o.channel), n().then(function(e) {
                    e && (s.code = e);
                    var a = {
                        url: i.DOMAIN + i.API.INDEX_CATEGORY,
                        data: s
                    };
                    return t.request.custom(a);
                }).then(function(t) {
                    if (t && 200 == t.statusCode && 200 === t.data.code) {
                        g = !0;
                        var i = t.data.categories, n = t.data.bonusLxBid, s = t.data.hongBaoData;
                        s && s.bigImgUrl && s.smallImgUrl && c.setData({
                            hongBaoData: s
                        }), c.setCategoryData(i, n, o), d(i);
                    } else c.triggerEvent("catefail"), d({
                        code: 500,
                        err: "请求金刚位数据失败"
                    }), a.log("获取金刚位数据失败:" + JSON.stringify(t.data)), e.owl.error.addError("fetch category data fail:", {
                        statusCode: t.statusCode,
                        data: JSON.stringify(t.data)
                    }, !0);
                    e.owl.pageSpeed.addPoint({
                        position: 3,
                        duration: Date.now() - r
                    }, "pages/index/index");
                }).catch(function(t) {
                    c.triggerEvent("catefail"), e.owl.pageSpeed.addPoint({
                        position: 3,
                        duration: Date.now() - r
                    }, "pages/index/index"), a.log("Index Category Error:" + JSON.stringify(t)), d({
                        code: 500,
                        err: t
                    });
                });
            });
        },
        getCategoryFromCache: function(t) {
            var i = this;
            a.log("IndexPage: 获取金刚位缓存"), this.getCategoryCache({
                cityId: t && t.city && t.city.cityId,
                channel: t.channel
            }).then(function(t) {
                !g && t && t.category && t.category.length && (d = !0, i.setData({
                    categoryList: t.category
                }, function() {
                    e.owl.pageSpeed.addFirstContentfulPaint("category", i.data.isFirstLoad ? Date.now() - i.data.initFinishTime : null);
                }), e.owl.resource.addApi({
                    name: "命中金刚位缓存",
                    statusCode: 200
                }));
            });
        },
        getCategoryCache: function(e) {
            var i = e.channel ? r[1] : r[0];
            return new Promise(function(n) {
                t.cache.getStorage(i).then(function(t) {
                    var a = null;
                    if (t && t.length) for (var i = t.length - 1; i >= 0; i--) {
                        var o = t[i];
                        if (o.cityId === e.cityId) {
                            a = o.category;
                            break;
                        }
                    }
                    n({
                        category: a
                    });
                }).catch(function() {
                    a.log("IndexPage: 获取金刚位缓存失败"), n();
                });
            });
        },
        setCategoryData: function(a, i, n) {
            var c = this;
            d = !0, this.setData({
                categoryList: a
            }, function() {
                e.owl.pageSpeed.addFirstContentfulPaint("category", c.data.isFirstLoad ? Date.now() - c.data.initFinishTime : null);
            }), this.doCategoryCache(a, n);
            var r = [];
            a.forEach(function(t, e) {
                r.push({
                    index: e,
                    categoryId: t.categoryId,
                    name: t.name
                });
            }), i && (t.lxmina.moduleView(i.mvBid), this.setData({
                bonusLxBid: i
            })), t.lxmina.moduleView(o.jgwMVBid, {
                jgwMVData: r
            });
        },
        doCategoryCache: function(e, a) {
            var i = this, n = a.channel ? r[1] : r[0], o = a && a.city && a.city.cityId;
            t.cache.getStorage(n).then(function(a) {
                var c = !0, r = [];
                if (a && a.length) {
                    var g = !0, d = !1, s = void 0;
                    try {
                        for (var y, l = a[Symbol.iterator](); !(g = (y = l.next()).done); g = !0) {
                            var h = y.value;
                            if (h.type && delete h.type, h.cityId === o) {
                                h.category = e, h.lastModify = new Date().getTime(), c = !1;
                                break;
                            }
                        }
                    } catch (t) {
                        d = !0, s = t;
                    } finally {
                        try {
                            !g && l.return && l.return();
                        } finally {
                            if (d) throw s;
                        }
                    }
                    r = a.sort(i.compare("lastModify")).slice();
                }
                if (c) {
                    var u = {
                        category: e,
                        cityId: o,
                        lastModify: new Date().getTime()
                    };
                    5 === r.length && r.shift(), r.push(u);
                }
                t.cache.setStorageSync(n, r);
            });
        },
        compare: function(t) {
            return function(e, a) {
                return e[t] - a[t];
            };
        },
        oldTap: function(e) {
            var a = e.currentTarget.dataset, i = a.id, n = a.name, o = a.url, c = a.type, r = a.index;
            if ("hongbao" == c) {
                var g = this.data.categoryList && this.data.categoryList[r] && this.data.categoryList[r].hongBaoData;
                this.setData({
                    hongBaoData: Object.assign({}, g, {
                        showBig: !0,
                        needPop: !0
                    }),
                    showBig: !0
                }), t.lxmina.moduleClick(this.data.bonusLxBid && this.data.bonusLxBid.mcBid), this.triggerEvent("noscroll");
            } else this.categoryTap(i, n, o);
        },
        onPopupClose: function() {
            this.setData({
                showBig: !1
            }), this.triggerEvent("close");
        },
        newTap: function(t) {
            var e = t.detail.id, a = t.detail.name, i = t.detail.url;
            this.categoryTap(e, a, i);
        },
        categoryTap: function(e, a, n) {
            n && t.navigation.navigateTo({
                url: n
            }), n && -1 !== n.indexOf("pages/list/list") && n && this._parseParams(e).then(function(e) {
                var a = "" + i.DOMAIN + i.API.SHOP_SEARCH;
                e = Object.assign({}, e, {
                    mtsiReferrer: encodeURIComponent(n)
                }), t.request.mina({
                    url: a,
                    data: e
                }, {
                    prefetch: "dp_list_" + e.categoryId + "_" + e.cityId + "_" + e.locateCityid + "_" + e.lat + "_" + e.lng + "_" + e.range + "_" + e.region + "_" + e.start
                });
            }).catch(function(t) {
                console.log("cache list error: ", t);
            });
            var c = null === e ? -10 : e;
            t.lxmina.moduleClick(o.jgwMCBid, {
                categoryName: a,
                categoryId: c
            });
        },
        _parseParams: function(e) {
            return new Promise(function(a) {
                var i = new Date().getTime(), n = t.login.getOpenIdSync() || t.login.getOpenIdCacheSync(), o = t.login.getTokenSync() || t.login.getTokenCacheSync(), c = {
                    _: i,
                    cookieId: n,
                    dpid: n,
                    categoryId: e,
                    sortId: 0,
                    start: 0,
                    token: o
                };
                if (t.geo.getCitySync() ? c.cityId = t.geo.getCitySync().cityId : t.geo.getCityCacheSync() ? c.cityId = t.geo.getCityCacheSync().cityId : t.geo.getLocCitySync() ? c.cityId = t.geo.getLocCitySync().cityId : t.geo.getLocCityCacheSync() ? c.cityId = t.geo.getLocCityCacheSync().cityId : c.cityId = 1, 
                t.geo.getLocCitySync() ? c.locateCityid = t.geo.getLocCitySync().cityId : t.geo.getLocCity() ? c.locateCityid = t.geo.getLocCity().cityId : c.locateCityid = c.cityId, 
                c.cityId === c.locateCityid) {
                    var r = t.geo.getLocationSync() || t.geo.getLocationCacheSync();
                    r.latitude && r.longitude && (c.lat = r.latitude, c.lng = r.longitude, c.myLat = r.latitude, 
                    c.myLng = r.longitude);
                }
                c.cityId !== c.locateCityid ? (c.regionId = 0, delete c.range) : (c.range = -1, 
                delete c.regionId), a(c);
            });
        }
    }
});