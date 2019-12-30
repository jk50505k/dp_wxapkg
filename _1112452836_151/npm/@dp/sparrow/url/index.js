function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function n() {
        e(this, n);
    }
    return r(n, [ {
        key: "parseQuery",
        value: function(e) {
            var r = {};
            if (!e) return r;
            try {
                var n = e.split("&");
                return n && n.length && n.forEach(function(e) {
                    var n = e.split("=");
                    r[n[0]] = n[1];
                }), r;
            } catch (e) {
                return console.log("Parse QueryString Fail", e), r;
            }
        }
    }, {
        key: "parseUrl",
        value: function(e, r) {
            r && r.shouldDecode && (e = decodeURIComponent(e));
            var n = e.split("#"), t = 2 === n.length ? n[1] : void 0, i = (e = n[0]).split("?"), u = i[0], a = 2 === i.length ? i[1] : "";
            return {
                uri: u,
                hash: t,
                query: this.parseQuery(a)
            };
        }
    }, {
        key: "parse",
        value: function(e, r) {
            return this.parseUrl(e, r);
        }
    }, {
        key: "_stringify",
        value: function(e, r) {
            if (!r) return e;
            var n = [];
            for (var t in r) r.hasOwnProperty(t) && void 0 !== r[t] && n.push(t + "=" + r[t]);
            return e ? ~e.indexOf("?") ? e + "&" + n.join("&") : e + "?" + n.join("&") : n.join("&");
        }
    }, {
        key: "stringify",
        value: function(e, r, n) {
            var t = this._stringify(e, r);
            return n && (t += "#" + n), t;
        }
    }, {
        key: "rewriteURL",
        value: function(e) {
            return e && 0 === e.indexOf("http://") && (e = e.replace("http://", "https://")), 
            e;
        }
    } ]), n;
}();

exports.default = new n();