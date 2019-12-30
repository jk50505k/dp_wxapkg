Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RuleMatch = void 0;

var n = require("./util"), r = require("./attribute");

exports.RuleMatch = {
    __proto__: null,
    attribute: r.attrCompile.compile,
    pseudo: function() {
        return function() {
            return !1;
        };
    },
    tag: function(r, t) {
        var e = t.name;
        return function(t) {
            return (0, n.getName)(t) === e && r(t);
        };
    },
    descendant: function(n) {
        return function(r) {
            for (var t = !1; !t && (r = r[5]); ) t = n(r);
            return t;
        };
    },
    parent: function(r) {
        function t(t) {
            return (0, n.isTag)(t) && r(t);
        }
        return function(n) {
            return n[2].some(t);
        };
    },
    child: function(n) {
        return function(r) {
            var t = r[5];
            return !!t && n(t);
        };
    },
    sibling: function(r) {
        return function(t) {
            for (var e = (0, n.getSiblings)(t), u = 0; u < e.length; u++) if ((0, n.isTag)(e[u])) {
                if (e[u] === t) break;
                if (r(e[u])) return !0;
            }
            return !1;
        };
    },
    adjacent: function(r) {
        return function(t) {
            for (var e, u = (0, n.getSiblings)(t), i = 0; i < u.length; i++) if ((0, n.isTag)(u[i])) {
                if (u[i] === t) break;
                e = u[i];
            }
            return !!e && r(e);
        };
    },
    universal: function(n) {
        return n;
    }
};