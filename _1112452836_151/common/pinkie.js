function t() {
    for (var t = 0; t < j.length; t++) j[t][0](j[t][1]);
    j = [], d = !1;
}

function n(n, e) {
    j.push([ n, e ]), d || (d = !0, g(t, 0));
}

function e(t, n) {
    function e(t) {
        u(n, t);
    }
    try {
        t(function(t) {
            i(n, t);
        }, e);
    } catch (t) {
        e(t);
    }
}

function o(t) {
    var n = t.owner, e = n._state, o = n._data, c = t[e], a = t.then;
    if ("function" == typeof c) {
        e = _;
        try {
            o = c(o);
        } catch (t) {
            u(a, t);
        }
    }
    r(a, o) || (e === _ && i(a, o), e === w && u(a, o));
}

function r(t, n) {
    var e;
    try {
        if (t === n) throw new TypeError("A promises callback cannot return that same promise.");
        if (n && ("function" == typeof n || "object" === (void 0 === n ? "undefined" : y(n)))) {
            var o = n.then;
            if ("function" == typeof o) return o.call(n, function(o) {
                e || (e = !0, n === o ? c(t, o) : i(t, o));
            }, function(n) {
                e || (e = !0, u(t, n));
            }), !0;
        }
    } catch (n) {
        return e || u(t, n), !0;
    }
    return !1;
}

function i(t, n) {
    t !== n && r(t, n) || c(t, n);
}

function c(t, e) {
    t._state === p && (t._state = m, t._data = e, n(f, t));
}

function u(t, e) {
    t._state === p && (t._state = m, t._data = e, n(s, t));
}

function a(t) {
    t._then = t._then.forEach(o);
}

function f(t) {
    t._state = _, a(t);
}

function s(t) {
    t._state = w, a(t), !t._handled && v && global.process.emit("unhandledRejection", t._data, t);
}

function l(t) {
    global.process.emit("rejectionHandled", t);
}

function h(t) {
    if ("function" != typeof t) throw new TypeError("Promise resolver " + t + " is not a function");
    if (this instanceof h == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    this._then = [], e(t, this);
}

var d, y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, p = "pending", m = "settled", _ = "fulfilled", w = "rejected", b = function() {}, v = "undefined" != typeof global && void 0 !== global.process && "function" == typeof global.process.emit, g = "undefined" == typeof setImmediate ? setTimeout : setImmediate, j = [];

h.prototype = {
    constructor: h,
    _state: p,
    _then: null,
    _data: void 0,
    _handled: !1,
    then: function(t, e) {
        var r = {
            owner: this,
            then: new this.constructor(b),
            fulfilled: t,
            rejected: e
        };
        return !e && !t || this._handled || (this._handled = !0, this._state === w && v && n(l, this)), 
        this._state === _ || this._state === w ? n(o, r) : this._then.push(r), r.then;
    },
    catch: function(t) {
        return this.then(null, t);
    }
}, h.all = function(t) {
    if (!Array.isArray(t)) throw new TypeError("You must pass an array to Promise.all().");
    return new h(function(n, e) {
        for (var o, r = [], i = 0, c = 0; c < t.length; c++) (o = t[c]) && "function" == typeof o.then ? o.then(function(t) {
            return i++, function(e) {
                r[t] = e, --i || n(r);
            };
        }(c), e) : r[c] = o;
        i || n(r);
    });
}, h.race = function(t) {
    if (!Array.isArray(t)) throw new TypeError("You must pass an array to Promise.race().");
    return new h(function(n, e) {
        for (var o, r = 0; r < t.length; r++) (o = t[r]) && "function" == typeof o.then ? o.then(n, e) : n(o);
    });
}, h.resolve = function(t) {
    return t && "object" === (void 0 === t ? "undefined" : y(t)) && t.constructor === h ? t : new h(function(n) {
        n(t);
    });
}, h.reject = function(t) {
    return new h(function(n, e) {
        e(t);
    });
}, module.exports = h;