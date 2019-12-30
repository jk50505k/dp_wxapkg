function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Store = exports.ACTIONS = exports.MUTATIONS = exports.storeKey = void 0;

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), n = require("../../mt-weapp-event/lib/index.js"), r = exports.storeKey = "__caster_vuex", i = exports.MUTATIONS = "mutations", o = exports.ACTIONS = "actions";

exports.Store = function() {
    function s() {
        var e = this;
        t(this, s), this.state = {}, this.commit = function(t) {
            for (var n, r = arguments.length, o = Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) o[s - 1] = arguments[s];
            o.unshift(e.state), e[i] && (n = e[i]).emit.apply(n, [ t ].concat(o));
        }, this.dispatch = function(t) {
            for (var n, r = arguments.length, i = Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) i[s - 1] = arguments[s];
            return i.unshift(e), Promise.all(e[o] ? (n = e[o]).emit.apply(n, [ t ].concat(i)) : []);
        };
    }
    return e(s, [ {
        key: "_reg",
        value: function(t, e, i) {
            var o = this;
            if (t) {
                this[e] || (this[e] = new n.Event());
                var s = {};
                if (i) {
                    var a = r + e;
                    s = i[a] = i[a] || {};
                }
                Object.keys(t).forEach(function(n) {
                    var r = t[n];
                    s[n] && o[e].off(n, s[n]), s[n] = r, o[e].on(n, r);
                });
            }
        }
    }, {
        key: "_unReg",
        value: function(t, e) {
            var i = this;
            this[t] || (this[t] = new n.Event());
            var o = {};
            if (e) {
                var s = r + t;
                o = e[s] || {}, e[s] = null;
            }
            Object.keys(o).forEach(function(e) {
                i[t].off(e, o[e]);
            });
        }
    }, {
        key: "register",
        value: function(t, e) {
            t && (e && (e[r] = this), this._reg(t[i], i, e), this._reg(t[o], o, e), Object.assign(this.state, t.state));
        }
    }, {
        key: "clean",
        value: function(t) {
            this._unReg(i, t), this._unReg(o, t);
        }
    } ]), s;
}();