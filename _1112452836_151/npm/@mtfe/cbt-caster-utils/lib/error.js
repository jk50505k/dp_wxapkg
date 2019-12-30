Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getErrorHandler = void 0;

var r = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("./config")), e = require("./constants"), t = require("./importer"), o = require("./log"), n = new Map(), a = function(r) {
    return setTimeout(function() {
        var e = r.comp, o = r.err;
        n.delete(o), e.triggerEvent && e.triggerEvent("error", o), (0, t.$import)("error-handler-v3|common").then(function(e) {
            e(r);
        });
    }, 500);
};

exports.getErrorHandler = function(i, u, s) {
    return function(c) {
        var m = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], d = c.message, g = u.name;
        if (c.message = "Caster Component: " + g + " throw " + i + " error; error: " + d + "; " + (s || ""), 
        n.has(c)) clearTimeout(n.get(c)); else if (c.type = i, c.caught = !0, c.uid = g + "_" + i + "_" + Date.now() + "_" + Math.floor(1e6 * Math.random()), 
        c.type === e.ErrorTypes.jsvm) {
            var l = c.jsvmStack = c.stack;
            c.stack = c.originalStack || l;
        }
        throw m && n.set(c, a({
            err: c,
            comp: u,
            depData: t.depData,
            onError: function() {
                return r.default.onError && r.default.onError(u, i, c);
            },
            metaLog: o.metaLog
        })), c;
    };
};