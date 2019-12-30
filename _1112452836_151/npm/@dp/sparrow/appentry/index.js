function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n() {
    return new Promise(function(e) {
        c.default.getOpenId().then(function(t) {
            200 == t.code ? e(t.openId) : e();
        });
    });
}

var a = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../geo/index")), c = t(require("../login/index")), i = [ {
    city: o.default.getCity.bind(o.default),
    locCity: o.default.getLocCity.bind(o.default),
    location: o.default.getLocation.bind(o.default),
    token: c.default.ensure.bind(c.default),
    openId: c.default.getOpenId.bind(c.default),
    uuid: n
}, {
    city: o.default.getCity.bind(o.default),
    locCity: o.default.getLocCity.bind(o.default),
    location: o.default.getLocationNoReject.bind(o.default),
    token: c.default.tryHard.bind(c.default),
    openId: c.default.getOpenId.bind(c.default),
    uuid: n
} ], u = function() {
    function t() {
        e(this, t), this.data = {}, this.cacheData = void 0;
    }
    return a(t, [ {
        key: "init",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return new Promise(function(n) {
                var a = [], o = [];
                t.map(function(e) {
                    1 === e.level ? a.push(e) : 2 === e.level && o.push(e);
                }), t = a.concat(o);
                var c = void 0;
                e.getCache().then(function(a) {
                    c = a;
                    var o = e._parseTask(c, t);
                    if (o && o.length) return o;
                    n({
                        code: 200,
                        data: a
                    });
                }).then(function(e) {
                    if (e && e.length) {
                        var t = e.map(function(e) {
                            return e.fn();
                        });
                        return Promise.all(t);
                    }
                }).then(function(e) {
                    if (e) {
                        var a = {};
                        t.map(function(t, n) {
                            if ("token" === t.name || "openId" === t.name) {
                                var o = t.name;
                                a[t.name] = e[n][o];
                            } else a[t.name] = e[n];
                        });
                        var o = Object.assign({}, c, a);
                        n({
                            code: 200,
                            data: o
                        });
                    } else n({
                        code: 200,
                        cache: c
                    });
                }).catch(function(e) {
                    n(e && e.code ? e : {
                        code: 500,
                        msg: e
                    });
                });
            });
        }
    }, {
        key: "getCache",
        value: function() {
            var e = this;
            return new Promise(function(t) {
                if (e.cacheData) t(e.cacheData); else {
                    var n = [ o.default.getLocationCache(), o.default.getCityCache(), o.default.getLocCityCache(), c.default.getTokenCache(), c.default.getOpenIdCache(), c.default.getOpenIdCache() ], a = function(e) {
                        return {
                            location: e[0],
                            city: e[1],
                            locCity: e[2],
                            token: e[3],
                            openId: e[4],
                            uuid: e[5]
                        };
                    };
                    Promise.all(n).then(function(n) {
                        var o = a(n);
                        e.cacheData = o, t(o);
                    }).catch(function() {
                        t();
                    });
                }
            });
        }
    }, {
        key: "getCacheSync",
        value: function() {
            var e = {};
            try {
                e.location = o.default.getLocationCacheSync();
            } catch (e) {
                console.log(e);
            }
            try {
                e.city = o.default.getCitySync();
            } catch (e) {
                console.log(e);
            }
            try {
                e.locCity = o.default.getLocCitySync();
            } catch (e) {
                console.log(e);
            }
            try {
                e.token = c.default.getTokenCacheSync();
            } catch (e) {
                console.log(e);
            }
            try {
                e.uuid = e.openId = c.default.getOpenIdCacheSync();
            } catch (e) {
                console.log(e);
            }
            return this.cacheData = e, e;
        }
    }, {
        key: "_parseTask",
        value: function(e, t) {
            for (var n in e) if (e.hasOwnProperty(n) && e[n]) for (var a = 0; a < t.length; a++) t[a].name === n && t.splice(a, 1);
            var o = {};
            t.map(function(e) {
                o[e.name] = e;
            }), o.city ? (delete o.locCity, delete o.location) : o.locCity && delete o.location;
            var c = [];
            for (var u in o) if (o.hasOwnProperty(u)) {
                var l = o[u].level, r = i[l - 1][u];
                r && c.push({
                    name: u,
                    fn: r
                });
            }
            return c;
        }
    } ]), t;
}();

exports.default = new u();