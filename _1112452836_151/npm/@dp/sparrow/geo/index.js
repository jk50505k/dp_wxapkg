function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../cache/index")), o = e(require("../wxp/index")), a = e(require("../request/index")), c = e(require("../event/index")), u = e(require("../env/index")), y = e(require("./lib/distance")), s = e(require("../../logan-wxapp/build/wxlogan.js")), f = [ "city", "loccity" ], r = 500, l = function() {
    function e(i) {
        var n = this;
        t(this, e), this.data = {
            location: {},
            city: {},
            locCity: {}
        }, this.locationPromise = {}, this.configs = {
            LOCATE_CITY_API: "/wxmapi/city/locatecity",
            domain: "https://m.dianping.com"
        }, this.distanceLimited = r, this.config(), u.default.on("envChanged", function(t) {
            "test" === t ? n.config({
                domain: "https://m.51ping.com"
            }) : n.config({
                domain: "https://m.dianping.com"
            });
        });
    }
    return i(e, [ {
        key: "config",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.configs = {
                LOCATE_CITY_API: "/wxmapi/city/locatecity",
                domain: "https://m.dianping.com"
            }, this.configs = Object.assign({}, this.configs, t);
        }
    }, {
        key: "getLocation",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return "gcj02" != t.type && !t.noCache && this.locationPromise.lastModify && +new Date() - this.locationPromise.lastModify < 18e4 ? this.locationPromise._promise : (this._fetchLocation(t), 
            this.locationPromise._promise);
        }
    }, {
        key: "_fetchLocation",
        value: function(t) {
            var e = this, i = new Promise(function(i, n) {
                var a = t.timeLimit || 5e3, c = null;
                o.default.getLocation({
                    type: t.type || "wgs84",
                    complete: function(t) {
                        t && t.latitude && t.longitude || n({
                            code: 102,
                            msg: t && t.msg
                        });
                    }
                }).then(function(t) {
                    var n = {
                        latitude: t.latitude,
                        longitude: t.longitude
                    };
                    c = n, e.setLocation(n), e._notifyLocalChange(n), i(Object.assign({
                        lastModify: +new Date()
                    }, n));
                }).catch(function(t) {
                    n({
                        code: 102,
                        msg: "定位失败",
                        error: t
                    });
                });
                var u = setTimeout(function() {
                    c || n({
                        code: 102,
                        msg: "定位超时失败"
                    }), clearTimeout(u);
                }, a);
            });
            this.locationPromise = {
                _promise: i,
                lastModify: +new Date()
            };
        }
    }, {
        key: "getLocationSync",
        value: function() {
            return this.data.location;
        }
    }, {
        key: "getLocationInfoSync",
        value: function() {
            return this.data.locationInfo;
        }
    }, {
        key: "getLocationNoReject",
        value: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(i) {
                t.getLocation(e).then(function(t) {
                    i(t);
                }, function() {
                    i();
                });
            });
        }
    }, {
        key: "getLocationForce",
        value: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(i, n) {
                t.getLocation(e).then(function(t) {
                    i(t);
                }, function() {
                    o.default.showModal({
                        content: "检测到你还没打开地理位置权限，是否去开启？"
                    }).then(function(t) {
                        t.confirm ? o.default.openSetting().then(function(t) {
                            i(t.authSetting["scope.userLocation"] ? {
                                code: 200,
                                msg: "获取用户位置权限成功"
                            } : {
                                code: 103,
                                msg: "用户仍然没有授权地理位置"
                            });
                        }, function() {
                            n({
                                code: 103,
                                msg: "打开授权页面失败"
                            });
                        }) : i({
                            code: 103,
                            msg: "用户拒绝地理位置授权"
                        });
                    });
                });
            });
        }
    }, {
        key: "getLocationCache",
        value: function() {
            var t = this;
            return new Promise(function(e) {
                n.default.getStorage("geo").then(function(i) {
                    i && +new Date() - i.lastModify < 9e5 ? i && i.location ? (t.setLocation(i.location, {
                        noCache: !0,
                        lastModify: i.lastModify
                    }), e(i.location)) : e() : (n.default.removeStorageSync("geo"), e());
                }).catch(function() {
                    e();
                });
            });
        }
    }, {
        key: "getLocationCacheSync",
        value: function() {
            var t = n.default.getStorageSync("geo");
            if (t && +new Date() - t.lastModify < 9e5) {
                if (t && t.location) return this.setLocation(t.location, {
                    noCache: !0,
                    lastModify: t.lastModify
                }), t.location;
            } else n.default.removeStorageSync("geo");
        }
    }, {
        key: "setLocation",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = {
                lastModify: e.lastModify || new Date().getTime(),
                location: t
            };
            this.data.location = t, this.data.locationInfo = i, e.noCache || this._setLocationCache(i);
        }
    }, {
        key: "_setLocationCache",
        value: function(t) {
            if (void 0 !== t) {
                var e = t.location;
                void 0 !== e.latitude && void 0 !== e.longitude && n.default.setStorage("geo", t);
            }
        }
    }, {
        key: "getLocCity",
        value: function(t) {
            var e = this;
            return t ? this._fetchLocCity(t) : this.getLocation().then(function(t) {
                return e._fetchLocCity(t);
            }, function() {
                return e._fetchLocCity();
            }).catch(function() {
                return Promise.resolve();
            });
        }
    }, {
        key: "getLocCitySync",
        value: function() {
            var t = this.data.locCity;
            return t && t.cityId ? t : this._getCityCacheSync(f[1]) || {};
        }
    }, {
        key: "getLocCityInfoSync",
        value: function() {
            return this.data.locCityInfo;
        }
    }, {
        key: "setLocCity",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (t && this._checkCity(t)) {
                (e = e || {}).isGeo = !0;
                var i = {
                    lastModify: e.lastModify || +new Date(),
                    city: t
                };
                this.data.locCity = t, this.data.locCityInfo = i, e.noCache || this._setCityCache(i, e);
            }
        }
    }, {
        key: "getCity",
        value: function() {
            var t = this;
            return new Promise(function(e) {
                t.data.city && t.data.city.cityId ? e(t.data.city) : t.getLocCity().then(function(i) {
                    if (i) t.setCity(i, {
                        isDefault: !0
                    }), e(i); else {
                        var n = t._getDefaultCity();
                        t.setCity(n, {
                            isDefault: !0
                        }), e(n);
                    }
                }).catch(function() {
                    var i = t._getDefaultCity();
                    t.setCity(i, {
                        isDefault: !0
                    }), e(i);
                });
            });
        }
    }, {
        key: "getCitySync",
        value: function() {
            var t = this.data.city;
            return t && t.cityId ? t : this._getCityCacheSync(f[0]) || {};
        }
    }, {
        key: "getCityInfoSync",
        value: function() {
            return this.data.cityInfo;
        }
    }, {
        key: "setCity",
        value: function(t) {
            var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (t && this._checkCity(t)) try {
                var n = i.lastModify;
                void 0 === i.lastModify && (n = +new Date());
                var o = {
                    isDefault: i.isDefault,
                    lastModify: n,
                    city: t
                }, a = function() {
                    (i = i || {}).isGeo = !1, e.data.city = t, e.data.cityInfo = o, i.noCache || e._setCityCache(o, i);
                };
                i.noCache ? this.data.city && this.data.city.cityId || (a(), c.default.trigger("cityChange", t)) : (this.data.city && t.cityId === this.data.city.cityId || c.default.trigger("cityChange", t), 
                a());
            } catch (t) {
                console.log("setCity", t);
            }
        }
    }, {
        key: "getCityCache",
        value: function() {
            return this._getCityCache(f[0]);
        }
    }, {
        key: "getCityCacheSync",
        value: function() {
            return console.error("geo.getCityCacheSync()方法在点评主小程序4.3版本废弃，请使用geo.getCitySync(),如有疑问联系chenxuanfeng"), 
            this._getCityCacheSync(f[0]);
        }
    }, {
        key: "getLocCityCache",
        value: function() {
            return this._getCityCache(f[1]);
        }
    }, {
        key: "getLocCityCacheSync",
        value: function() {
            return console.error("geo.getLocCityCacheSync()方法在点评主小程序4.3版本废弃，请使用geo.getLocCitySync(),如有疑问联系chenxuanfeng"), 
            this._getCityCacheSync(f[1]);
        }
    }, {
        key: "_getCityCache",
        value: function(t) {
            var e = this;
            return new Promise(function(i) {
                -1 !== f.indexOf(t) ? n.default.getStorage(t).then(function(o) {
                    o && o.city ? (t === f[0] ? e.setCity(o.city, {
                        noCache: !0,
                        isDefault: o.isDefault,
                        lastModify: o.lastModify
                    }) : o && +new Date() - o.lastModify < 9e5 ? e.setLocCity(o.city, {
                        noCache: !0,
                        lastModify: o.lastModify
                    }) : (n.default.removeStorageSync(t), i()), i(o.city)) : i(), i(o);
                }).catch(function() {
                    i();
                }) : i();
            });
        }
    }, {
        key: "_getCityCacheSync",
        value: function(t) {
            var e = n.default.getStorageSync(t);
            if (e) {
                if (t === f[0]) this.setCity(e.city, {
                    noCache: !0,
                    isDefault: e.isDefault,
                    lastModify: e.lastModify
                }); else {
                    if (!(+new Date() - e.lastModify < 9e5)) return void n.default.removeStorageSync(t);
                    this.setLocCity(e.city, {
                        noCache: !0,
                        lastModify: e.lastModify
                    });
                }
                return e.city;
            }
        }
    }, {
        key: "_checkCity",
        value: function(t) {
            return t && void 0 !== t.cityId && void 0 !== t.cityName;
        }
    }, {
        key: "_setCityCache",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (t) {
                var i = e.isGeo ? f[1] : f[0];
                -1 !== f.indexOf(i) && n.default.setStorageSync(i, t);
            }
        }
    }, {
        key: "_getDefaultCity",
        value: function() {
            return {
                cityId: 2,
                cityName: "北京",
                isOverseaCity: !1
            };
        }
    }, {
        key: "fetchCityByGeo",
        value: function(t) {
            var e = void 0, i = this.configs;
            return e = t ? {
                lat: t.latitude,
                lng: t.longitude
            } : {}, new Promise(function(t, n) {
                a.default.base({
                    url: i.domain + i.LOCATE_CITY_API,
                    data: e
                }).then(function(e) {
                    e && 200 == e.statusCode && 200 == e.data.code && e.data.cityInfo && e.data.cityInfo.cityId ? t(e.data.cityInfo) : n("定位城市服务出错");
                }).catch(function() {
                    n("定位城市出错");
                });
            });
        }
    }, {
        key: "_fetchLocCity",
        value: function(t) {
            var e = this;
            return new Promise(function(i, n) {
                e.fetchCityByGeo(t).then(function(t) {
                    e.setLocCity(t), i(t);
                }).catch(function(t) {
                    n({
                        code: 103,
                        msg: t
                    });
                });
            });
        }
    }, {
        key: "_notifyLocalChange",
        value: function(t) {
            var e = this.getLocationSync();
            if (e && t) {
                var i = (0, y.default)(e, t);
                i > this.distanceLimited && (c.default.trigger("dp_changedLocation", t), s.default.log("经纬度发生变更, locationPrev:" + JSON.stringify(e) + ", locationCurr:" + JSON.stringify(t) + ", distance:" + JSON.stringify(i)));
            }
        }
    }, {
        key: "onLocationChange",
        value: function(t, e) {
            e && (this.distanceLimited = e), c.default.on("dp_changedLocation", t);
        }
    } ]), e;
}();

exports.default = new l();