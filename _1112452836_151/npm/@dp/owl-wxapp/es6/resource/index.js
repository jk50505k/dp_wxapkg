function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../env"), n = require("../util/util"), o = require("../constant/index"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./model")), a = "resource", s = [], c = function() {
    function c(r, t) {
        e(this, c), this.cfgManager = r, this.errManager = t, this.CACHE_SEND_TRIGGER = 10;
    }
    return r(c, [ {
        key: "_parse",
        value: function(e) {
            return e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, t.getPageUrl)()), 
            e.project || (e.project = this.cfgManager.get("project")), e;
        }
    }, {
        key: "_stringify",
        value: function(e) {
            var r = [], t = r = e ? s.splice(0, this.CACHE_SEND_TRIGGER) : s.splice(0, s.length);
            if (t && t.length) try {
                for (var n = this.cfgManager.getExtension(), o = {}, i = [], a = [ "region", "operator", "network", "container", "os" ], c = 0; c < a.length; c++) o[a[c]] = "";
                for (var u = 0; u < t.length; u++) {
                    var g = t[u];
                    i.push(g);
                }
                for (var l in o) o.hasOwnProperty(l) && (o[l] = n[l] || "");
                return o.infos = i, o;
            } catch (e) {
                console.log("_stringify err");
            }
        }
    }, {
        key: "pushApi",
        value: function(e, r) {
            try {
                var t = this._parse(e), n = new i.default(t);
                if (s.push(n), !s.length) return;
                s.length >= this.CACHE_SEND_TRIGGER && this.report(!0), r && this.report();
            } catch (e) {
                console.log("pushApi err" + JSON.stringify(e.stack || e));
            }
        }
    }, {
        key: "addApi",
        value: function(e, r) {
            if (e) try {
                if (void 0 !== e.networkCode && "number" != typeof e.networkCode) return void console.log("网络状态码必须为Number类型", JSON.stringify(e));
                if (void 0 !== e.statusCode && "number" != typeof e.statusCode) return void console.log("业务状态码必须为Number类型", JSON.stringify(e));
                var t = {
                    type: "api",
                    connectType: e.connectType || "https",
                    resourceUrl: e.name,
                    statusCode: (e.networkCode || "") + "|" + (e.statusCode || ""),
                    responsetime: e.responseTime && e.responseTime.toString() ? e.responseTime.toString() : "0"
                };
                e.content && (t.firstCategory = o.CATEGORY.AJAX, t.secondCategory = e.secondCategory || e.name, 
                t.logContent = e.content), this.pushApi(t, r);
            } catch (e) {
                console.log("addApi err" + JSON.stringify(e.stack || e));
            }
        }
    }, {
        key: "addApiError",
        value: function(e, r, t) {
            var n = this.cfgManager.get(a).errSample || .2;
            Math.random() > n || this.errManager.pushError({
                sec_category: e,
                content: r,
                category: "ajaxError",
                level: "warn"
            }, t);
        }
    }, {
        key: "report",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = this.cfgManager;
            try {
                var t = this._stringify(e);
                if (Math.random() > r.get(a).sample) return;
                if (t) {
                    var o = r.getApiPath(a), i = (0, n.stringify)(o);
                    i = i + "&" + (0, n.getReportVersions)(r.config), (0, n.requestQueue)({
                        url: i,
                        data: t,
                        header: {
                            "content-type": "application/json"
                        },
                        method: "POST",
                        success: function() {}
                    });
                }
            } catch (e) {
                console.log("report err" + JSON.stringify(e.stack || e));
            }
        }
    } ]), c;
}();

exports.default = c;