function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function r(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = function() {
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
}), exports.OWL = exports.owl = void 0, exports.page = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Page;
    (0, l.default)(v, e, r);
}, exports.app = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : App;
    (0, c.default)(v, e, r);
}, exports.request = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : v;
    return (0, a.default)(e, r);
};

var n = r(require("./error/index")), i = r(require("./resource/index")), a = r(require("./resource/request")), o = r(require("./page/index")), u = r(require("./metric/index")), s = r(require("./log/index")), f = r(require("./config")), g = require("./env"), l = r(require("./page")), c = r(require("./app")), d = r(require("./error/model")), p = r(require("./util/logan")), h = function() {
    function r(t) {
        e(this, r);
        var a = new f.default(t);
        this.error = new n.default(a), this.resource = new i.default(a, this.error), this.pageSpeed = new o.default(a, this.error), 
        this.logManager = new s.default(a, this.error), this.cfgManager = a, this.init();
    }
    return t(r, [ {
        key: "init",
        value: function() {
            var e = this;
            (0, g.getEnv)().then(function(r) {
                e.cfgManager.setExtension(r);
            });
        }
    }, {
        key: "newMetric",
        value: function() {
            return new u.default(this.cfgManager);
        }
    }, {
        key: "report",
        value: function() {
            this.error.report(), this.resource.report(), this.pageSpeed.report();
        }
    } ]), r;
}(), v = new h({});

v.OWL = h, v.errorModel = d.default, v.start = function(e) {
    if (!this.isStarted && (this.isStarted = !0, e && v.cfgManager.set(e), this.cfgManager.get("logan").enable)) {
        var r = this.cfgManager.get("logan").Logan, t = this.cfgManager.get("logan").config, n = this.cfgManager.get("project");
        p.default.ready({
            LoganAPI: r,
            project: n,
            loganConfig: t
        });
    }
}, exports.owl = v, exports.OWL = h;