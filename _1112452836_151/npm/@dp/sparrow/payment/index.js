function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var l = n[t];
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), 
            Object.defineProperty(e, l.key, l);
        }
    }
    return function(n, t, l) {
        return t && e(n.prototype, t), l && e(n, l), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../env/index.js")), l = function() {
    function l() {
        e(this, l);
    }
    return n(l, [ {
        key: "requestPayment",
        value: function(e) {
            t.default.get() === t.default.ENV_TEST ? e.responseUrl ? wx.request({
                url: e.responseUrl,
                success: function(n) {
                    setTimeout(function() {
                        e.success && e.success.call(null, n);
                    }, 800);
                },
                fail: function(n) {
                    e.fail && e.fail.call(null, n);
                },
                complete: function(n) {
                    e.complete && e.complete.call(null, n);
                }
            }) : console.log("responseUrl is not defined!") : wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(n) {
                    e.success && e.success.call(null, n);
                },
                fail: function(n) {
                    e.fail && e.fail.call(null, n);
                },
                complete: function(n) {
                    e.complete && e.complete.call(null, n);
                }
            });
        }
    } ]), l;
}();

exports.default = new l();