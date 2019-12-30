function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = [ "resourceUrl", "connectType", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], n = [ "resourceUrl", "connectType", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], o = function() {
    function o(t) {
        var n = this;
        e(this, o), r.forEach(function(e) {
            void 0 !== t[e] ? n[e] = t[e] : n[e] = "";
        }), this.parse();
    }
    return t(o, [ {
        key: "update",
        value: function(e) {
            for (var t in e) e.hasOwnProperty(t) && -1 !== r.indexOf(t) && (this[t] = e[t]);
        }
    }, {
        key: "parse",
        value: function() {
            if (!this.timestamp) {
                var e = Date.now();
                this.timestamp = e.toString();
            }
            this.requestbyte || (this.requestbyte = "0"), this.responsebyte || (this.responsebyte = "0");
        }
    }, {
        key: "stringify",
        value: function() {
            var e = this;
            return n.map(function(t) {
                return e[t];
            }).join("\t");
        }
    } ]), o;
}();

exports.default = o;