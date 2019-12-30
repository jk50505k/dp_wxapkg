var t = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), i = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), a = require("../../../../config/index"), n = !1;

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
        },
        isSupportMiniPro: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        this.getCache();
    },
    data: {
        ads: null
    },
    methods: {
        optionsChange: function(t, e) {
            t && t.city ? this.fetchData() : this.resetActivity();
        },
        fetchData: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign(t, this.data.options);
            return i.log("获取首页活动信息请求参数: " + JSON.stringify(e)), e.cityChange && this.resetActivity(), 
            this.initActivity(e.city.cityId);
        },
        initActivity: function(o) {
            var d = this, s = Date.now(), r = {
                url: a.DOMAIN + a.API.INDEX_ACTIVITY,
                data: {
                    cityId: o
                }
            };
            return new Promise(function(a) {
                t.request.custom(r).then(function(t) {
                    if (e.owl.pageSpeed.addPoint({
                        position: 4,
                        duration: Date.now() - s
                    }, "pages/index/index"), t && 200 == t.statusCode && 200 === t.data.code) {
                        n = !0;
                        var o = t.data.ads;
                        i.log("IndexPage: 渲染运营位"), o && o.length || (o = null), d.setData({
                            ads: o
                        }, function() {
                            e.owl.pageSpeed.addFirstContentfulPaint("activity", d.data.isFirstLoad ? Date.now() - d.data.initFinishTime : null);
                        }), d.setCache([ o ]), a({
                            code: 200
                        });
                    } else a({
                        code: 500,
                        err: "获取活动数据失败"
                    }), i.log("获取活动数据失败:" + JSON.stringify(t.data)), e.owl.error.addError("fetch Activity data fail", {
                        statusCode: t.statusCode,
                        data: JSON.stringify(t.data)
                    }, !0);
                }).catch(function(t) {
                    e.owl.pageSpeed.addPoint({
                        position: 4,
                        duration: Date.now() - s
                    }, "pages/index/index"), i.log("Index Activity Error:" + JSON.stringify(t)), a({
                        code: 500,
                        err: t
                    });
                });
            });
        },
        getCache: function() {
            var i = this;
            return t.cache.getStorage("dp_index_activity").then(function(t) {
                if (t && t.data && t.data.length && i.getAcDay() == t.lastModify && !n) {
                    var a = t.data;
                    i.setData({
                        ads: a.length > 1 ? a[1] : a[0]
                    }, function() {
                        e.owl.pageSpeed.addFirstContentfulPaint("activity", i.data.isFirstLoad ? Date.now() - i.data.initFinishTime : null);
                    });
                }
            });
        },
        setCache: function(e) {
            t.cache.setStorage("dp_index_activity", {
                lastModify: this.getAcDay(),
                data: e
            });
        },
        getAcDay: function() {
            var t = new Date();
            return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
        },
        resetActivity: function() {
            this.setData({
                ads: null
            });
        }
    }
});