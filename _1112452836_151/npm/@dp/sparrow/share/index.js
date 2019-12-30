function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        var t = [], n = !0, a = !1, o = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(n = (i = u.next()).done) && (t.push(i.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            a = !0, o = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw o;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../wxp/index")), a = function() {
    function a() {
        e(this, a);
    }
    return t(a, [ {
        key: "getOpenGroupId",
        value: function(e) {
            var t = {
                openGId: void 0,
                msg: ""
            };
            return e ? Promise.all([ n.default.login(), n.default.getShareInfo({
                shareTicket: e
            }) ]).then(function(e) {
                var a = r(e, 2), o = a[0], i = a[1], u = o.code, l = i.encryptedData, c = i.iv;
                return u && l && c ? n.default.request({
                    url: "https://m.dianping.com/wxmapi/login/shareinfo",
                    data: {
                        code: u,
                        encryptedData: l,
                        iv: c
                    }
                }).then(function(e) {
                    var r = e.statusCode, n = e.data;
                    return 200 == r && n ? n.data && 200 == n.code ? t.openGId = n.data.openGId : t.msg = "服务出错" : t.msg = "网络出错", 
                    Promise.resolve(t);
                }) : (t.msg = "微信API出错", Promise.resolve(t));
            }) : (t.msg = "shareTicket不存在", Promise.resolve(t));
        }
    }, {
        key: "share",
        value: function(e) {
            return e;
        }
    } ]), a;
}();

exports.default = new a();