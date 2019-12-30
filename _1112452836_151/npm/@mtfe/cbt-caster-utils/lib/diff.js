function o(r, n, c, f) {
    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [];
    null == r || null == n ? f[c] = r : r && r[2] && n && n[2] ? r.forEach(function(s, a) {
        switch (a) {
          case 0:
          case 4:
          case 3:
            s !== n[a] && (f[c + "[" + a + "]"] = s);
            break;

          case 1:
            Object.keys(n[1]).forEach(function(o) {
                void 0 === s[o] && (s[o] = null);
            }), Object.keys(s).forEach(function(o) {
                "r" === r[0] && "wxss" === o && n[1][o] || "rid" === o && null === s[o] || o === t.COMP_INDEX && "a2" === r[0] && s.core && ~i.indexOf(r[3]) && n[o] || "object" !== e(s[o]) && s[o] === n[1][o] || (f[c + "[1]." + o] = s[o]);
            });
            break;

          case 2:
            Array.isArray(s) && Array.isArray(n[2]) && s.length >= n[2].length ? s.forEach(function(e, t) {
                o(e, n[2][t], c + "[2][" + t + "]", f, i);
            }) : f[c + "[2]"] = r[2];
        }
    }) : r[1] !== n[1] && (f[c] = r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.diff = void 0;

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = require("./constants");

exports.diff = function(e, t, r, n) {
    var c = {};
    return o(e, t, r, c, n || []), c;
};