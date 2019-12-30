function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getScope = exports.injectIntoScope = exports.getVm = exports.vm = exports.Scope = void 0;

var t = require("../../jsvm-with-confusion/build/jsvm.js");

Object.defineProperty(exports, "Scope", {
    enumerable: !0,
    get: function() {
        return t.Scope;
    }
});

var r = e(t), o = e(require("../../mt-weapp-event/lib/index.js")), n = exports.vm = void 0, p = exports.getVm = function() {
    return n || (exports.vm = n = new r.default(getApp(), {
        getApp: getApp,
        wx: wx,
        app: getApp(),
        requirePlugin: "undefined" == typeof requirePlugin || requirePlugin,
        require: require,
        event: o.default,
        getCurrentPages: getCurrentPages
    }, {
        ThrowVariableNotDefinedException: !1
    })), n;
}, u = exports.injectIntoScope = function(e, t) {
    t && Object.keys(t).forEach(function(r) {
        e.var(r, t[r]);
    });
};

exports.getScope = function(e) {
    n || p();
    var r = new t.Scope("function", n.getRootScope());
    return u(r, e), r;
};