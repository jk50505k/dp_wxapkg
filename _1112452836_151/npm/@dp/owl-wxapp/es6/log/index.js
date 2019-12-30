function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../util/logan")), r = function() {
    function r(n) {
        e(this, r), this.cfgManager = n;
    }
    return n(r, [ {
        key: "addLog",
        value: function(e) {
            try {
                if ("string" != typeof e) return void console.log("addLog只接受string类型的日志");
                t.default.log("[Log]: " + e);
            } catch (e) {
                console.log("logan addlog err");
            }
        }
    } ]), r;
}();

exports.default = r;