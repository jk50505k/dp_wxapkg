function n(n, e, t) {
    return new Promise(function(o, i) {
        wx.request({
            url: n,
            method: e,
            data: t,
            success: function() {
                o(!0);
            },
            fail: function() {
                i(!1);
            }
        });
    });
}

function e(n, e) {
    return new Promise(function(t, o) {
        wx.request({
            url: n,
            data: {
                data: JSON.stringify(e)
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function() {
                t(!0);
            },
            fail: function() {
                o(!1);
            }
        });
    });
}

function t(e, t) {
    return n(c.getBaseUrl(t) + "?" + e, "get");
}

function o(n, t) {
    return e(c.getBaseUrl(t), n);
}

function i() {
    function n() {
        t = setTimeout(function() {
            e();
        }, 200);
    }
    function e() {
        if (i.length) {
            var n = i.slice(0);
            i = [], o(n.map(function(n) {
                return n[0];
            }), n[0][1]);
        }
    }
    var t, i = [], u = r.config.maxSendSize || 10;
    return function() {
        i.length > u && e(), t && clearTimeout(t), i.push(arguments), n();
    };
}

var r = require("./config"), u = require("./enum"), c = require("./utils"), s = i(), d = i();

exports.sendClickPoint = function(n, e, o, i) {
    return t(c.buildActionUrl(decodeURIComponent(n) + (o ? "&" + o : ""), e, u.ACT_TYPE.CLICK_POINT, i), i);
}, exports.sendLoadPoint = function(n, e, t, o) {
    return s(encodeURIComponent(c.buildActionUrl(decodeURIComponent(n) + (t ? "&" + t : ""), e, u.ACT_TYPE.LOAD_POINT, o)), o);
}, exports.sendImpressionPoint = function(n, e, t, o) {
    return d(encodeURIComponent(c.buildActionUrl(decodeURIComponent(n) + (t ? "&" + t : ""), e, u.ACT_TYPE.IMPRESSION_POINT, o)), o);
}, exports.sendReachPoint = function(n, e, o, i) {
    return t(c.buildActionUrl(decodeURIComponent(n) + (o ? "&" + o : ""), e, u.ACT_TYPE.REACH_POINT, i), i);
};