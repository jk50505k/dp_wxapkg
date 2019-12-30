Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.noop = function() {}, exports.cached = function(t, e) {
    var r = new Map(), n = function() {
        var n = e && e.apply(this, arguments) || arguments[0], o = r.get(n);
        return o || (o = t.apply(this, arguments), r.set(n, o)), o;
    };
    return n.cache = r, n;
};

exports.throttle = function(t, e) {
    var r = void 0;
    return function() {
        for (var n = this, o = arguments.length, u = Array(o), i = 0; i < o; i++) u[i] = arguments[i];
        return r || (r = setTimeout(function() {
            r = null, t.apply(n, u);
        }, e));
    };
};