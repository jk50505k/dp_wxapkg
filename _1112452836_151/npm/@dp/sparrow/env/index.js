function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../event/index")).default.Event, o = "test", u = "product", s = function(s) {
    function a() {
        e(this, a);
        var n = t(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
        return n.disabled = !1, n.env = "product", n.envList = [ "test", "product" ], n.ENV_TEST = o, 
        n.ENV_PRODUCT = u, n.env = u, n.envList = [ o, u ], n;
    }
    return n(a, i), r(a, [ {
        key: "get",
        value: function() {
            return this.env;
        }
    }, {
        key: "set",
        value: function(e) {
            this.disabled || (-1 === this.envList.indexOf(e) && (e = this.ENV_PRODUCT), this.env !== e && (this.env = e, 
            this.trigger("envChanged", e)));
        }
    }, {
        key: "setTest",
        value: function() {
            this.disable || (this.env = this.ENV_TEST);
        }
    }, {
        key: "setProduct",
        value: function() {
            this.env = this.ENV_PRODUCT;
        }
    }, {
        key: "disable",
        value: function() {
            this.disabled = !0, this.env = this.ENV_PRODUCT;
        }
    } ]), a;
}();

exports.default = new s();