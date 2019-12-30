function n() {
    var n = getCurrentPages() || [];
    return n.length ? n[n.length - 1].route || n[n.length - 1].__route__ : "app";
}

function e() {
    try {
        return wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(n) {
            n && (o.network = n.networkType);
        }), new Promise(function(n) {
            wx.getNetworkType({
                success: function(e) {
                    n(e.networkType);
                },
                fail: function() {
                    n("unknown network");
                }
            }), setTimeout(function() {
                n("unknown network");
            }, 2e3);
        });
    } catch (n) {
        console.log("getNetWorkType err");
    }
}

function t() {
    return new Promise(function(n) {
        wx.getSystemInfo({
            success: function(e) {
                if (e) {
                    var t = e.system, r = void 0 === t ? "" : t, o = e.version, i = void 0 === o ? "Unknown" : o, s = e.SDKVersion, u = void 0 === s ? "Unknown" : s, c = r.toLowerCase().match(/ios/) ? "iOS" : "Android";
                    n({
                        os: c,
                        wxVersion: i,
                        wxLibVersion: u
                    });
                } else n("unknown system");
            },
            fail: function() {
                n("unknown system");
            }
        });
    });
}

var r = function() {
    function n(n, e) {
        var t = [], r = !0, o = !1, i = void 0;
        try {
            for (var s, u = n[Symbol.iterator](); !(r = (s = u.next()).done) && (t.push(s.value), 
            !e || t.length !== e); r = !0) ;
        } catch (n) {
            o = !0, i = n;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw i;
            }
        }
        return t;
    }
    return function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return n(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPageUrl = n, exports.getEnv = function() {
    var i = n();
    try {
        return new Promise(function(n) {
            Object.keys(o).length ? n(Object.assign({
                pageUrl: i
            }, o)) : Promise.all([ e(), t() ]).then(function(e) {
                var t = r(e, 2), s = t[0], u = t[1];
                s && u ? (o = Object.assign({}, u, {
                    container: "MicroMessenger"
                }, {
                    network: s
                }, {
                    unionId: ""
                }), n(Object.assign({}, o, {
                    pageUrl: i
                }))) : n({});
            }).catch(function() {
                n({});
            });
        });
    } catch (n) {
        console.log("getEnv err");
    }
};

var o = {};