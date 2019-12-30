function e(e) {
    return /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(e);
}

function r(e) {
    var r = [];
    return e.replace(t, function(e, t, u, c) {
        r.push(u ? c.replace(n, "$1") : t || e);
    }), r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mergeObj = function(t, n) {
    return n && Object.keys(n).forEach(function(u) {
        if (e(u)) {
            for (var c = r(u), o = 0, f = c.length - 1, s = t; null != t && o < f; ) s = s[c[o++]];
            s[c[o]] = n[u];
        } else t[u] = n[u];
    }), t;
};

var t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g;