function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = require("../env"), r = require("../util/util"), n = function() {
    function n(t) {
        e(this, n), this.cfgManager = t, this.speed = {}, this.firstContentfullPaint = {}, 
        this.moduleFirstRenderTime = {}, this.pageSource = {};
    }
    return t(n, [ {
        key: "pushSpeed",
        value: function(e, t, r) {
            var n = this, a = this.speed;
            a[e] || (a[e] = {}, a[e].customspeed = []);
            try {
                (0, i.getEnv)().then(function(i) {
                    if (i) {
                        var o = i;
                        o.pageurl = e || o.pageUrl, delete o.pageUrl;
                        var s = n.cfgManager.config, u = s.project, l = s.unionId, f = s.wxAppVersion;
                        Object.assign(a[e], o, {
                            project: u,
                            timestamp: Date.now(),
                            unionId: l,
                            speed: "0|0|0",
                            wxAppVersion: f
                        }), a[e].customspeed[t] = r;
                    }
                });
            } catch (e) {
                console.log("pushSpeed err");
            }
        }
    }, {
        key: "start",
        value: function(e, t) {
            this["start-" + e + "-" + t] = Date.now();
        }
    }, {
        key: "end",
        value: function(e, t) {
            var i = this["start-" + e + "-" + t], r = this["start-app-0"];
            r && (delete this["start-app-0"], this.pushSpeed("app", 0, Date.now() - r)), i ? this.pushSpeed(e, t, Date.now() - i) : console.log("请先埋点 start");
        }
    }, {
        key: "addSource",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default";
            try {
                if (this._refresh) return;
                var t = (0, i.getPageUrl)();
                this.pageSource[t] || (this.pageSource[t] = {}), this.pageSource[t].source = e;
            } catch (e) {
                console.log("addSource error", JSON.stringify(e));
            }
        }
    }, {
        key: "addPoint",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
            if (!this._refresh) {
                t || (t = (0, i.getPageUrl)() || "");
                try {
                    if ("app" === t) this.pushSpeed("app", e.position, Date.now() - this._appStart); else {
                        var r = this._start || Date.now(), n = void 0;
                        if (void 0 === e.position) return void console.log("请先埋点position");
                        if (void 0 !== e.duration) n = e; else if (void 0 !== r) {
                            var a = e.timeStamp || +Date.now();
                            n = {
                                position: e.position,
                                duration: a - r
                            };
                        }
                        n && this.pushSpeed(t, n.position, n.duration);
                    }
                } catch (e) {
                    console.log("addPoint err");
                }
            }
        }
    }, {
        key: "createFirstContentfulPaint",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [ "default" ], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            try {
                if (this._refresh) return;
                var r = (0, i.getPageUrl)();
                this.firstContentfullPaint[r] || (this.firstContentfullPaint[r] = {}), this.firstContentfullPaint[r][t] = e;
            } catch (e) {
                console.log("create first error", JSON.stringify(e));
            }
        }
    }, {
        key: "addFirstContentfulPaint",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default", t = arguments[1];
            if (!this._refresh) {
                var r = (0, i.getPageUrl)(), n = void 0;
                try {
                    this.firstContentfullPaint[r] || (this.firstContentfullPaint[r] = {}), n = t || +new Date() - this._start, 
                    this.moduleFirstRenderTime[r] || (this.moduleFirstRenderTime[r] = {}), this.moduleFirstRenderTime[r][e] || (this.moduleFirstRenderTime[r][e] = n);
                } catch (e) {
                    console.log("add first error", JSON.stringify(e));
                }
            }
        }
    }, {
        key: "_getPageFirstPaint",
        value: function(e, t) {
            var i = this, r = void 0;
            try {
                this.firstContentfullPaint[e] && (r = this.firstContentfullPaint[e][t]);
                var n = 0;
                return this.moduleFirstRenderTime[e] ? (r.map(function(t) {
                    var r = i.moduleFirstRenderTime[e][t] || 0;
                    n = Math.max(r, n);
                }), n) : n;
            } catch (e) {
                return console.log("_getPageFirstPaint err"), 0;
            }
        }
    }, {
        key: "appLaunch",
        value: function(e, t) {
            this._appStart = e, this._enterPage = t;
        }
    }, {
        key: "appReady",
        value: function(e) {
            e === this._enterPage && this.addPoint({
                position: 0
            }, "app");
        }
    }, {
        key: "pageLoad",
        value: function() {
            this._start = Date.now(), this._refresh = !1;
        }
    }, {
        key: "pageReady",
        value: function() {
            this.addPoint({
                position: 0
            }, (0, i.getPageUrl)());
        }
    }, {
        key: "pullRefresh",
        value: function() {
            this._refresh = !0;
        }
    }, {
        key: "report",
        value: function() {
            var e = this, t = this.cfgManager, i = this.speed, n = this.firstContentfullPaint, a = this.moduleFirstRenderTime, o = t.getApiPath("page");
            try {
                Object.keys(i).map(function(s) {
                    var u = Object.assign({}, i[s]);
                    if (n[s]) {
                        var l = e.firstContentfullPaint[s];
                        try {
                            for (var f in l) u.customspeed[f] = e._getPageFirstPaint(s, f) || "";
                        } catch (e) {
                            console.log("err:" + JSON.stringify(e));
                        }
                    }
                    u.customspeed = u.customspeed.join("|");
                    var c = (0, r.stringify)(o);
                    c = (0, r.stringify)(c, u), i[s] && delete i[s], a[s] && delete a[s], n[s] && delete n[s], 
                    Math.random() > t.get("page").sample || (0, r.requestQueue)({
                        url: c,
                        header: {
                            "content-type": "application/x-www-form-urlencoded;"
                        },
                        method: "GET",
                        success: function() {}
                    });
                });
            } catch (e) {
                console.log("page report err");
            }
        }
    } ]), n;
}();

exports.default = n;