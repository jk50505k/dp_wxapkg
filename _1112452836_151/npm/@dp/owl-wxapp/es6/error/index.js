function r(r, e) {
    if (!(r instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, o = function() {
    function r(r, e) {
        for (var o = 0; o < e.length; o++) {
            var t = e[o];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(r, t.key, t);
        }
    }
    return function(e, o, t) {
        return o && r(e.prototype, o), t && r(e, t), e;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../env"), n = require("../util/util"), i = require("../constant/index"), c = require("./model").default, a = [], s = function() {
    function s(e) {
        r(this, s), this.cfgManager = e;
    }
    return o(s, [ {
        key: "parse",
        value: function(r) {
            return r.project || (r.project = this.cfgManager.get("project")), r.pageUrl || (r.pageUrl = this.cfgManager.get("pageUrl") || (0, 
            t.getPageUrl)()), r;
        }
    }, {
        key: "pushError",
        value: function(r, e) {
            var o = this, n = this.cfgManager;
            try {
                (0, t.getEnv)().then(function(t) {
                    var i = new c(r);
                    i = i.updateTags({
                        wxLibVersion: t.wxLibVersion,
                        wxVersion: t.wxVersion
                    }), i = (i = o._handleError(i)).toJson(), r = o.parse(i);
                    var s = t.network, u = t.container, l = t.os, f = t.unionId;
                    f = n.config.unionId || f, r = Object.assign({
                        network: s,
                        container: u,
                        os: l,
                        unionId: f
                    }, r), a.push(r), e && o.report();
                });
            } catch (r) {
                this.reportSystemError(r), console.log("owl-inside-error pushError", r);
            }
        }
    }, {
        key: "_handleError",
        value: function(r) {
            try {
                var e = this.cfgManager.get("onErrorPush");
                if (e instanceof Function && (r = e(r)), r instanceof c || void 0 === r) return r;
                console.log("onErrorPush方法返回结果有误");
            } catch (e) {
                return r;
            }
        }
    }, {
        key: "addError",
        value: function(r, o, t) {
            r || (r = "default"), o || (o = "error");
            var n = o && o.level ? o.level : i.LEVEL.ERROR;
            try {
                o instanceof c || (o instanceof Error ? o = o.stack || o.message : "object" === (void 0 === o ? "undefined" : e(o)) && (o = {
                    sec_category: o.name,
                    content: o.msg
                })), this.pushError({
                    sec_category: r,
                    content: o,
                    category: i.CATEGORY.SCRIPT,
                    level: n
                }, t);
            } catch (r) {
                this.reportSystemError(r), console.log("owl-inside-error", r);
            }
        }
    }, {
        key: "reportSystemError",
        value: function(r) {
            var e = this;
            try {
                r && r.stack && (0, t.getEnv)().then(function() {
                    a.push(new c({
                        project: "owl",
                        pageUrl: e.cfgManager.config.project + (0, t.getPageUrl)(),
                        sec_category: r.msg || r.name || "parseError",
                        content: JSON.stringify(r.stack)
                    })), e.report();
                }).catch(function(r) {
                    console.log("owl-error", r);
                });
            } catch (r) {
                console.log("reportSystemError", r);
            }
        }
    }, {
        key: "onError",
        value: function() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "jsError", t = "unknow error", n = i.LEVEL.ERROR, a = void 0, s = !1;
            try {
                r && "string" == typeof r ? a = r : r && "object" === (void 0 === r ? "undefined" : e(r)) && (a = r.message || r.toString()), 
                a && "string" == typeof a && (-1 !== a.indexOf("SDKScriptError") ? s = !0 : -1 !== a.indexOf("webviewScriptError") ? s = !0 : t = (t = (t = a.replace("thirdScriptError", "").split(";")).length ? t[0] : "").replace(/\t|\n/g, "")), 
                s || this.pushError(new c({
                    content: a,
                    category: o,
                    sec_category: t,
                    level: n
                }), !0);
            } catch (r) {
                this.reportSystemError(r), console.log("owl-inside-error onError", r);
            }
        }
    }, {
        key: "report",
        value: function(r, e) {
            var o = this.cfgManager;
            if (a.length) try {
                var t = o.getApiPath("error"), i = (0, n.stringify)(t);
                i = i + "&" + (0, n.getReportVersions)(o.config), (0, n.requestQueue)({
                    url: i,
                    data: "c=" + encodeURIComponent(JSON.stringify(a)),
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded;"
                    },
                    success: function(e) {
                        a = [], r && r instanceof Function && r(e);
                    },
                    fail: function(r) {
                        e && e instanceof Function && e(r);
                    }
                });
            } catch (r) {
                this.reportSystemError(r), console.log("owl-inside-error report", r);
            }
        }
    } ]), s;
}();

exports.default = s;