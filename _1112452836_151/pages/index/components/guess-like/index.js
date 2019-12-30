var t = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), i = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), a = require("../../../../config/index"), n = require("../../common/checkopenid"), o = require("../../../../utils/url_stringify"), d = {
    cnxhMVBid: "b_ehowwq13",
    cnxhMCBid: "b_te90iltp",
    sceneMVBid: "b_tnxir9n0",
    sceneMCBid: "b_8edxmtzi"
};

Component({
    properties: {
        options: {
            type: Object,
            value: null,
            observer: "optionsChange"
        },
        lastCity: {
            type: Object,
            value: null
        },
        isFirstLoad: {
            type: Boolean,
            value: !1
        },
        initFinishTime: {
            type: Number,
            value: null
        },
        reachBottom: {
            type: Boolean,
            value: !1,
            observer: "reachBottom"
        }
    },
    data: {
        showModule: !1,
        listView: {},
        sceneData: []
    },
    methods: {
        optionsChange: function(t, e) {
            t && Object.keys(t).length ? ((t.reLoad || t.cityChange) && this.resetListView(), 
            this.data.showModule || this.setData({
                showModule: !0
            }), n(), this.fetchData(t), this.fetchSceneRecommend(t)) : this.setData({
                showModule: !1
            });
        },
        fetchData: function() {
            var e = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Object.assign({}, i, this.data.options);
            return new Promise(function(i) {
                var n = t.geo.getLocationSync(), o = {
                    needClear: !0,
                    cityId: a.city.cityId,
                    wxuuid: t.login.getOpenIdSync() || "",
                    page: 1
                };
                n && (o.lat = n.latitude || "", o.lng = n.longitude || ""), a.pullDown && e.data.listView.list ? o.update = !0 : (a.cityChange && (o.cityChange = !0), 
                e.setData({
                    "listView.firstLoading": !0,
                    "listView.list": [],
                    "listView.listError": null
                })), e.fetchList(o).then(function(t) {
                    i(t && 200 === t.code ? {
                        code: 200
                    } : {
                        code: t.code,
                        err: t.err
                    });
                });
            });
        },
        fetchList: function(n) {
            var s = this, c = Date.now();
            if (!(n = n || this.data.params)) return Promise.resolve();
            var r = {
                cityId: n.cityId,
                wxuuid: n.wxuuid,
                page: n.page,
                lat: n.lat,
                lng: n.lng
            };
            return r = Object.assign({}, r, {
                mtsiReferrer: encodeURIComponent(o("/pages/index/index", r))
            }), i.log("IndexPage: 读取猜你喜欢接口，参数==>" + JSON.stringify(r)), new Promise(function(o) {
                t.request.custom({
                    url: a.DOMAIN + a.API.GUESS_YOU_LIKE,
                    data: r
                }).then(function(a) {
                    var l = Date.now() - c;
                    if (e.owl.pageSpeed.addPoint({
                        position: 5,
                        duration: l
                    }, "pages/index/index"), 200 != a.statusCode || !a.data || 200 != a.data.code && 201 != a.data.code) s.setData({
                        listView: {
                            list: null,
                            listError: {
                                iconType: 2
                            },
                            isEnd: !0
                        }
                    }), o({
                        code: a.data.code,
                        err: "猜你喜欢服务返回出错"
                    }), e.owl.error.addError("猜你喜欢服务返回出错", {
                        statusCode: a.statusCode,
                        data: JSON.stringify(a.data)
                    }, !0), i.log("猜你喜欢服务返回出错==>" + JSON.stringify(a.data)); else {
                        var u = a.data, g = {}, p = [], h = n.needClear ? [] : s.data.listView.list || [], f = u.guessYouVoList;
                        f.forEach(function(t, e) {
                            p.push({
                                index: e,
                                dealgroupid: t.dealgroupid
                            });
                        }), f = f.map(function(t) {
                            return "shop" == t.item_type ? {
                                type: 1,
                                shopInfo: t
                            } : {
                                type: 2,
                                groupInfo: t
                            };
                        }), h = h.concat(f), g.list = h, i.log("IndexPage: 获得猜你喜欢商户个数" + h.length), 0 === g.list.length ? (g.list = [], 
                        g.listError = {
                            iconType: 3,
                            description: "暂无推荐，逛逛其他的吧~"
                        }) : (!u.hasNextPage || h.length < 6 ? g.isEnd = !0 : g.isEnd = !1, g.firstLoading = !1, 
                        g.showLoading = !g.isEnd, r.page++, g.page = r.page, g.needBottom = 1);
                        var m = t.geo.getCitySync();
                        if (m && n.cityId === m.cityId) {
                            if (n.cityChange && s.data.lastCity && l < 500) var y = setTimeout(function() {
                                s.setData({
                                    params: r,
                                    listView: g
                                }, function() {
                                    e.owl.pageSpeed.addFirstContentfulPaint("guessLike", s.data.isFirstLoad ? Date.now() - s.data.initFinishTime : null), 
                                    o({
                                        code: 200
                                    }), clearTimeout(y);
                                });
                            }, 500 - l); else s.setData({
                                params: r,
                                listView: g
                            }, function() {
                                e.owl.pageSpeed.addFirstContentfulPaint("guessLike", s.data.isFirstLoad ? Date.now() - s.data.initFinishTime : null), 
                                o({
                                    code: 200
                                });
                            });
                            1 === n.page && s.setCache(n.cityId, g), t.lxmina.moduleView(d.cnxhMVBid, {
                                cnxhMVData: p
                            });
                        }
                    }
                }).catch(function(t) {
                    var a = void 0;
                    a = 1 !== n.page ? {
                        list: s.data.listView.list,
                        tryAgain: !0
                    } : {
                        list: null,
                        listError: {
                            iconType: 1
                        },
                        isEnd: !0
                    }, n.update ? s.getCache().then(function(e) {
                        e && e.cityId && e.cityId == n.cityId && e.list ? (r.page++, s.setData({
                            params: r,
                            listView: e.list
                        })) : s.setData({
                            listView: a
                        }), o({
                            code: 500,
                            msg: "获取猜你喜欢失败",
                            err: t
                        });
                    }) : (s.setData({
                        listView: a
                    }), o({
                        code: 500,
                        msg: "获取猜你喜欢失败",
                        err: t
                    })), e.owl.pageSpeed.addPoint({
                        position: 5,
                        duration: Date.now() - c
                    }, "pages/index/index"), i.log("获取猜你喜欢第" + n.page + "页数据请求err: " + JSON.stringify(t));
                });
            });
        },
        getCache: function() {
            return t.cache.getStorage("dp_index_guesslike");
        },
        setCache: function(e, i) {
            t.cache.setStorage("dp_index_guesslike", {
                cityId: e,
                list: i
            });
        },
        resetListView: function() {
            this.setData({
                listView: {
                    list: []
                }
            });
        },
        reachBottom: function(t, e) {
            if (t) {
                var i = this.data.listView;
                !(i.firstLoading || i.isEnd || i.listError || i.tryAgain) && this.fetchList(), this.setData({
                    reachBottom: !1
                });
            }
        },
        onPageExceptionTap: function() {
            this.fetchList();
        },
        onExceptionTap: function() {
            i.log("IndexPage: list异常点击重新加载数据"), this.resetListView(), this.triggerEvent("listexceptionreload");
        },
        tapShop: function(e) {
            var i = e.detail.cardId, a = e.detail.groupId || "";
            t.navigation.navigateTo({
                url: "/pages/detail/detail?shopUuid=" + i
            }), t.lxmina.moduleClick(d.cnxhMCBid, {
                dealGroupId: a,
                poi_id: i
            });
        },
        tapGroup: function(e) {
            var i = e.detail.url, a = e.detail.cardId, n = e.detail.groupId || "";
            t.navigation.navigateTo({
                url: i
            }), t.lxmina.moduleClick(d.cnxhMCBid, {
                dealGroupId: n,
                poi_id: a
            });
        },
        fetchSceneRecommendData: function(e) {
            var n = e.lat, o = e.lng, d = e.cityId, s = e.locateCityId;
            return i.log("IndexPage: 读取场景化推荐接口，参数==>" + JSON.stringify({
                lat: n,
                lng: o,
                cityId: d,
                locateCityId: s
            })), new Promise(function(e) {
                t.request.custom({
                    url: a.DOMAIN + a.API.SCENE_RECOMMEND,
                    data: {
                        lat: n,
                        lng: o,
                        cityId: d,
                        locateCityId: s
                    }
                }).then(function(t) {
                    200 != t.statusCode || !t.data || 200 != t.data.code && 202 != t.data.code ? 201 == t.data.code ? (i.log("IndexPage: 读取场景化推荐接口失败，场景化推荐失败"), 
                    e({
                        code: t.data.code,
                        err: "场景化推荐失败"
                    })) : 203 == t.data.code && (i.log("IndexPage: 读取场景化推荐接口失败，场景化推荐参数异常"), e({
                        code: t.data.code,
                        err: "场景化推荐参数异常"
                    })) : e({
                        code: t.data.code,
                        data: t.data.recommendList || []
                    });
                }).catch(function(t) {
                    e({
                        code: 500,
                        err: t
                    }), i.log("获取场景化推荐错误，err: " + JSON.stringify(t));
                });
            });
        },
        tapScene: function(e) {
            var i = e.currentTarget.dataset.url;
            i && (t.lxmina.moduleClick(d.sceneMCBid), t.navigation.navigateTo({
                url: i
            }));
        },
        fetchSceneRecommend: function() {
            var i = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.geo.getLocationSync(), o = n.latitude, s = n.longitude, c = t.geo.getLocCitySync().cityId, r = a.city.cityId;
            this.fetchSceneRecommendData({
                lat: o,
                lng: s,
                cityId: c,
                locateCityId: r
            }).then(function(a) {
                !a || 200 !== a.code && 202 !== a.code || (i.setData({
                    sceneData: a.data
                }, function() {
                    e.owl.pageSpeed.addFirstContentfulPaint("sceneRecommend", i.data.isFirstLoad ? Date.now() - i.data.initFinishTime : null);
                }), t.lxmina.moduleView(d.sceneMVBid));
            });
        }
    }
});