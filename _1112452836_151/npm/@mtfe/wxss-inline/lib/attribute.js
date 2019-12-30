Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.attrCompile = void 0;

var t = require("./util"), e = /[-[\]{}()*+?.,\\^$|#\s]/g, n = {
    __proto__: null,
    equals: function(e, n) {
        var r = n.name, u = n.value;
        return function(n) {
            return (0, t.getAttributeValue)(n, r) === u && e(n);
        };
    },
    hyphen: function(e, n) {
        var r = n.name, u = n.value, a = u.length;
        return function(n) {
            var l = (0, t.getAttributeValue)(n, r);
            return null != l && l.substr(0, a) === u && (l.length === a || "-" === l.charAt(a)) && e(n);
        };
    },
    element: function(n, r) {
        var u = r.name, a = r.value;
        if (/\s/.test(a)) return t.falseFunc;
        var l = "(?:^|\\s)" + (a = a.replace(e, "\\$&")) + "(?:$|\\s)", i = r.ignoreCase ? "i" : "", o = new RegExp(l, i);
        return function(e) {
            var r = (0, t.getAttributeValue)(e, u);
            return null != r && o.test(r) && n(e);
        };
    },
    exists: function(e, n) {
        var r = n.name;
        return function(n) {
            return (0, t.hasAttrib)(n, r) && e(n);
        };
    },
    start: function(e, n) {
        var r = n.name, u = n.value, a = u.length;
        return 0 === a ? t.falseFunc : function(n) {
            var l = (0, t.getAttributeValue)(n, r);
            return null != l && l.substr(0, a) === u && e(n);
        };
    },
    end: function(e, n) {
        var r = n.name, u = n.value, a = -u.length;
        return 0 === a ? t.falseFunc : function(n) {
            var l = (0, t.getAttributeValue)(n, r);
            return null != l && l.substr(a) === u && e(n);
        };
    },
    any: function(e, n) {
        var r = n.name, u = n.value;
        return "" === u ? t.falseFunc : function(n) {
            var a = (0, t.getAttributeValue)(n, r);
            return null != a && a.indexOf(u) >= 0 && e(n);
        };
    },
    not: function(e, n) {
        var r = n.name, u = n.value;
        return "" === u ? function(n) {
            return !!(0, t.getAttributeValue)(n, r) && e(n);
        } : function(n) {
            return (0, t.getAttributeValue)(n, r) !== u && e(n);
        };
    }
};

exports.attrCompile = {
    compile: function(t, e) {
        if (e.ignoreCase || "not" === e.action) throw SyntaxError("Unsupported attribute selector");
        return n[e.action](t, e);
    },
    rules: n
};